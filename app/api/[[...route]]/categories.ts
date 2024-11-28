import { Hono } from 'hono'
import { z } from 'zod'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from "@hono/zod-validator"
import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/schemas/category'

const app = new Hono()
  .use('*', clerkMiddleware())
  .get('/', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const data = await prisma.category.findMany({
      where: {
        userId: auth.userId
      }
    })

    return c.json({ data }, 200)
  })
  .get("/:id", 
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
    const auth = getAuth(c)
    const id = c.req.param("id")

    if (!id) {
      return c.json({ message: "Missing ID" }, 400)
    }

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const data = await prisma.category.findUnique({
      where: {
        id,
        userId: auth.userId
      }
    })

    if (!data) {
      return c.json({ message: `The category with the ID ${id} was not found` }, 404)
    }

    return c.json({ data }, 200)
  })
  .post("/",
    zValidator("json", categorySchema),
    async (c) => {
      const auth = getAuth(c)
      const { name } = c.req.valid("json")

      if (!name) {
        return c.json({ message: "Missing fields" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.category.create({
        data: {
          name,
          userId: auth.userId
        }
      })

      return c.json({ data }, 200)
    }
  )
  .patch("/:id",
    zValidator("json", categorySchema),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c)
      const { name } = c.req.valid("json")
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ message: "Missing ID" }, 400)
      }

      if (!name) {
        return c.json({ message: "Missing fields" }, 400)
      }

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.category.update({
        where: {
          id,
          userId: auth.userId
        },
        data: {
          name
        }
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

    const data = await prisma.category.delete({
      where: {
        id,
        userId: auth.userId
      }
    })

    if (!data) {
      return c.json({ message: `The category with the ID ${id} was not found` }, 404)
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

      const data = await prisma.category.deleteMany({
        where: {
          id: {
            in: ids
          },
          userId: auth.userId
        }
      })

      return c.json({ message: `${data.count} categories deleted successfully.` }, 200)
    }
  )


export default app