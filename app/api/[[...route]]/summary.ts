import { Hono } from "hono"
import { z } from "zod"
import { differenceInDays, parse, subDays } from "date-fns"
import { zValidator } from "@hono/zod-validator"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { prisma } from "@/lib/prisma"
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils"

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

      const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom
      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo

      const periodLength = differenceInDays(endDate, startDate) + 1

      const lastPeriodStart = subDays(startDate, periodLength)
      const lastPeriodEnd = subDays(endDate, periodLength)

      async function calculatePeriodData(userId: string, start: Date, end: Date) {
        const transactions = await prisma.transaction.findMany({
          where: {
            account: {
              userId
            },
            accountId: accountId ? accountId : undefined,
            date: {
              gte: start,
              lte: end
            }
          },
          select: {
            amount: true
          }
        })

        const incomeAndExpenses = transactions.reduce((acc, { amount }) => {
          if (amount > 0) {
            return { ...acc, income: acc.income += amount }
          } else {
            return { ...acc, expenses: acc.expenses += amount }
          }
        }, { income: 0, expenses: 0 })

        const remaining = incomeAndExpenses.income + incomeAndExpenses.expenses

        return { ...incomeAndExpenses, remaining }
      }

      const currentPeriod = await calculatePeriodData(auth.userId, startDate, endDate)
      const lastPeriod = await calculatePeriodData(auth.userId, lastPeriodStart, lastPeriodEnd)

      const incomeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income)
      const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses)
      const remainingChange = calculatePercentageChange(currentPeriod.remaining, lastPeriod.remaining)

      const categories = await prisma.category.findMany({
        where: {
          userId: auth.userId,
          Transaction: {
            every: {
              accountId: accountId ? accountId : undefined,
            },
          }
        },
        select: {
          Transaction: {
            where: {
              amount: {
                lt: 0
              },
              date: {
                gte: startDate,
                lte: endDate
              }
            },
            select: {
              amount: true
            }
          },
          name: true
        }
      })

      const categoriesReduced = categories.map(({ name, Transaction: transactions }) => {
        return ({
          name,
          amount: transactions.reduce((acc, { amount }) => acc + amount, 0) * -1
        })
      })

      const sortedCategories = categoriesReduced.sort((a, b) => b.amount - a.amount)

      const topCategories = sortedCategories.slice(0, 3)

      const others = sortedCategories.slice(3).reduce((acc, { amount }) => acc + amount, 0)

      const categoriesExpenses = [...topCategories, { name: "Others", amount: others }]

      const dbDays = (await prisma.transaction.findMany({
        where: {
          account: {
            userId: auth.userId
          },
          accountId: accountId ? accountId : undefined,
          date: {
            gte: startDate,
            lte: endDate
          }
        },
        select: {
          date: true,
          amount: true
        },
        orderBy: {
          date: "desc"
        }
      })).map(({ amount, date }) => amount > 0 ? ({ date, income: amount }) : ({ date, expenses: amount }))

      type GroupedDays = {
        [key: string]: {
          date: Date,
          income: number,
          expenses: number
        }
      }

      const groupedDays = dbDays.reduce<GroupedDays>((acc, { date, expenses, income }) => {
        const dateString = date.toISOString().split("T")[0]

        if (acc[dateString]) {
          acc[dateString].income += income || 0
          acc[dateString].expenses += expenses || 0
        } else {
          acc[dateString] = {
            date,
            income: income || 0,
            expenses: expenses || 0
          }
        }

        return acc
      }, {})

      const days = fillMissingDays(Object.values(groupedDays), startDate, endDate)

      return c.json({
        income: currentPeriod.income,
        incomeChange,
        expenses: currentPeriod.expenses,
        expensesChange,
        remaining: currentPeriod.remaining,
        remainingChange,
        categoriesExpenses,
        days
      })
    }
  )

export default app