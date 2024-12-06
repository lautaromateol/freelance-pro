import { Hono } from 'hono'
import { z } from 'zod'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from "@hono/zod-validator"
import { prisma } from '@/lib/prisma'
import { listSchema, listToUpdate } from '@/schemas/list'

const app = new Hono()
  .use('*', clerkMiddleware())
  .post("/",
    zValidator("json", listSchema),
    async (c) => {
      const auth = getAuth(c)
      const { name, projectId } = c.req.valid("json")

      if (!name) {
        return c.json({ message: "Missing fields" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const dbList = await prisma.list.findFirst({
        where: {
          projectId
        },
        orderBy: {
          order: "desc"
        }
      })

      const order = dbList ? dbList.order + 1 : 1


      const data = await prisma.list.create({
        data: {
          name,
          projectId,
          order
        }
      })

      return c.json({ data }, 200)
    }
  )
  .patch("/:id",
    zValidator("json", listToUpdate),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.list.update({
        where: {
          id,
          project: {
            userId: auth.userId
          }
        },
        data: values
      })

      return c.json({ data }, 200)
    })
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

      const data = await prisma.list.delete({
        where: {
          id,
          project: {
            userId: auth.userId
          }
        }
      })

      if (!data) {
        return c.json({ message: `The list with the ID ${id} was not found` }, 404)
      }

      return c.json({ data }, 200)

    })
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

      const project = await prisma.list.findFirst({
        where: {
          id: ids[0]
        },
        select: {
          projectId: true
        }
      })

      await prisma.list.deleteMany({
        where: {
          id: {
            in: ids
          },
          project: {
            userId: auth.userId
          },
        },
      })

      return c.json({ project }, 200)
    }
  )


export default app