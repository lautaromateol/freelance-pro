import { z } from "zod";

export const transactionApiSchema = z.object({
  notes: z.string().optional().nullable(),
  payee: z.string(),
  amount: z.number(),
  date: z.coerce.date(),
  categoryId: z.string().optional().nullable(),
  accountId: z.string(),
  projectId: z.string().optional().nullable()
})

export const transactionSchema = z.object({
  notes: z.string().optional().nullable(),
  payee: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  categoryId: z.string().optional().nullable(),
  accountId: z.string(),
  projectId: z.string().optional().nullable()
})
