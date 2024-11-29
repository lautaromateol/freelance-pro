import { z } from "zod";

export const transactionApiSchema = z.object({
  notes: z.string().optional(),
  payee: z.string(),
  amount: z.number(),
  date: z.coerce.date(),
  categoryId: z.string().optional(),
  accountId: z.string(),
  projectId: z.string().optional()
})

export const transactionSchema = z.object({
  notes: z.string().optional(),
  payee: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  categoryId: z.string().optional(),
  accountId: z.string(),
  projectId: z.string().optional()
})
