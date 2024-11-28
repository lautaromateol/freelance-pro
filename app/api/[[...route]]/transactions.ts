import { Hono } from "hono";
import { z } from "zod";
import { subDays } from "date-fns"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/lib/prisma";
import { transactionApiSchema } from "@/schemas/transactions";

const app = new Hono()
  .get("/",
    clerkMiddleware(),
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

      const defaultFrom = from ? new Date(from) : subDays(new Date(), 30)
      const defaultTo = to ? new Date(to) : new Date()

      const data = await prisma.transaction.findMany({
        where: {
          account: {
            id: accountId,
            userId: auth?.userId
          },
          date: {
            gte: defaultFrom,
            lte: defaultTo
          }
        }
      })

      return c.json({ data }, 200)
    }
  )
  .get("/:id",
    clerkMiddleware(),
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
    clerkMiddleware(),
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
        data: {
          ...values,
          amount: parseInt(values.amount)
        }
      })

      if (!data) {
        return c.json({ message: `The account with the ID ${id} was not found` }, 404)
      }

      return c.json({ data }, 200)
    }
  )
  .post("/",
    clerkMiddleware(),
    zValidator("json", transactionApiSchema),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ message: 'Unauthorized' }, 401)
      }

      const data = await prisma.transaction.create({
        data: {
          ...values,
          amount: parseInt(values.amount)
        }
      })

      return c.json({ data }, 200)
    }
  )
  .delete("/:id",
    clerkMiddleware(),
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

export default app