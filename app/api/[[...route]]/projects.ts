import { Hono } from 'hono'
import { z } from 'zod'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from "@hono/zod-validator"
import { prisma } from '@/lib/prisma'
import { projectApiSchema } from '@/schemas/project'

const app = new Hono()
  .use('*', clerkMiddleware())
  .get('/', async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const data = await prisma.project.findMany({
      where: {
        userId: auth.userId
      },
      include: {
        client: {
          select: {
            name: true
          }
        }
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

    const data = await prisma.project.findUnique({
      where: {
        id,
        userId: auth.userId
      }
    })

    if (!data) {
      return c.json({ message: `The project with the ID ${id} was not found` }, 404)
    }

    return c.json({ data }, 200)
  })
  .post("/",
    zValidator("json", projectApiSchema),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.project.create({
        data: values
      })

      return c.json({ data }, 200)
    }
  )
  .patch("/:id",
    zValidator("json", projectApiSchema),
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

      const data = await prisma.project.update({
        where: {
          id,
          userId: auth.userId
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

    const data = await prisma.project.delete({
      where: {
        id,
        userId: auth.userId
      }
    })

    if (!data) {
      return c.json({ message: `The project with the ID ${id} was not found` }, 404)
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

      const data = await prisma.project.deleteMany({
        where: {
          id: {
            in: ids
          },
          userId: auth.userId
        }
      })

      return c.json({ message: `${data.count} projects deleted successfully.` }, 200)
    }
  )


export default app