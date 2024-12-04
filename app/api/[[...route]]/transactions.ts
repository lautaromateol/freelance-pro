import { Hono } from "hono";
import { z } from "zod";
import { format, subDays } from "date-fns"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/lib/prisma";
import { transactionApiSchema } from "@/schemas/transactions";

const app = new Hono()
  .use("*", clerkMiddleware())
  .get("/",
    zValidator("query", z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional()
    })),
    async (c) => {
      const auth = getAuth(c)
      const { accountId, from, to } = c.req.valid("query")

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }
      
      const defaultTo = new Date()
      const defaultFrom = subDays(defaultTo, 30)

      const start = from ? format(from, "yyyy-MM-dddd") : defaultFrom
      const end = to ? format(to, "yyyy-MM-dddd") : defaultTo

      const data = await prisma.transaction.findMany({
        where: {
          account: {
            id: accountId,
            userId: auth?.userId
          },
          date: {
            gte: start,
            lte: end
          }
        },
        include: {
          account: {
            select: {
              name: true
            }
          },
          category: {
            select: {
              name: true
            }
          }
        }
      })

      return c.json({ data }, 200)
    }
  )
  .get("/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.findUnique({
        where: {
          id,
          account: {
            userId: auth.userId
          }
        }
      })

      if (!data) {
        return c.json({ message: `The transaction with the ID ${id} was not found` }, 404)
      }

      return c.json({ data }, 200)
    }
  )
  .patch("/:id",  
    zValidator("json", transactionApiSchema),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")
      const values = c.req.valid("json")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.update({
        where: {
          id,
          account: {
            userId: auth.userId
          }
        },
        data: values
      })

      if (!data) {
        return c.json({ message: `The account with the ID ${id} was not found` }, 404)
      }

      return c.json({ data }, 200)
    }
  )
  .post("/",
    zValidator("json", transactionApiSchema),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")
      
      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }


      const data = await prisma.transaction.create({
        data: values
      })

      return c.json({ data }, 200)
    }
  )
  .delete("/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.delete({
        where: {
          id,
          account: {
            userId: auth.userId
          }
        }
      })

      if (!data) {
        return c.json({ message: `The account with the ID ${id} was not found` }, 404)
      }

      return c.json({ data }, 200)
    }
  )
  .post("/bulk-delete",
    zValidator("json", z.object({
      ids: z.array(z.string())
    })),
    async (c) => {
      const auth = getAuth(c)
      const { ids } = c.req.valid("json")

      if (!ids) {
        return c.json({ message: "Missing ID's" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.deleteMany({
        where: {
          id: {
            in: ids
          },
          account: {
            userId: auth.userId
          }
        }
      })

      return c.json({ message: `${data.count} transactions deleted successfully.` }, 200)
    }
  )
  .post("/bulk-create",
    zValidator("json", z.object({
      transactions: z.array(transactionApiSchema)
    })),
    async (c) => {
      const auth = getAuth(c)
      const { transactions } = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.createMany({
        data: transactions
      })

      return c.json({ data })
    }
  )

export default app