import { Hono } from "hono";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/lib/prisma";
import { taskSchema, taskUpdateSchema } from "@/schemas/task";

const app = new Hono()
  .use("*", clerkMiddleware())
  .post("/",
    zValidator("json", taskSchema),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const dbCard = await prisma.task.findFirst({
        where: {
          listId: values.listId
        },
        orderBy: {
          order: "desc"
        }
      })

      const order = dbCard ? dbCard.order + 1 : 1

      const data = await prisma.task.create({
        data: {
          ...values,
          order
        },
        include: {
          list: {
            select: {
              project: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      })

      return c.json({ data }, 200)
    }
  )
  .get("/:projectId",
    zValidator("param", z.object({
      projectId: z.string()
    })),
    async (c) => {
      const auth = getAuth(c)
      const { projectId } = c.req.valid("param")

      if (!auth?.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const data = await prisma.task.findMany({
        where: {
          list: {
            project: {
              id: projectId,
              userId: auth.userId
            }
          },
        }
      })

      return c.json({ data }, 200)
    }
  )
  .patch("/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", taskUpdateSchema),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")
      const values = c.req.valid("json")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const data = await prisma.task.update({
        where: {
          id,
          list: {
            project: {
              userId: auth.userId
            }
          }
        },
        data: values,
        include: {
          list: {
            select: {
              project: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      })

      return c.json({ data }, 200)
    }
  )
  .delete("/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const data = await prisma.task.delete({
        where: {
          id,
          list: {
            project: {
              userId: auth.userId
            }
          }
        },
        include: {
          list: {
            select: {
              project: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      })

      return c.json({ data }, 200)
    }
  )
  .post("/update-orders",
    zValidator("json", z.object({
      tasks: z.array(taskUpdateSchema)
    })),
    async (c) => {
      const auth = getAuth(c)
      const { tasks } = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const transaction = tasks.map((task) => (
        prisma.task.update({
          where: {
            id: task.id,
            list: {
              project: {
                userId: auth.userId
              }
            }
          },
          data: {
            order: task.order
          },
          include: {
            list: {
              select: {
                projectId: true
              }
            }
          }
        })
      ))

      const data = await prisma.$transaction(transaction)

      return c.json({ data })
    })

export default app