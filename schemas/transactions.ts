import { z } from "zod";

export const transactionApiSchema = z.object({
  notes: z.string().optional().nullable(),
  payee: z.string(),
  amount: z.number().refine((data) => data !== 0, {
    message: "Amount cannot be 0."
  }),
  date: z.coerce.date(),
  categoryId: z.string().optional().nullable(),
  accountId: z.string(),
  projectId: z.string().optional().nullable()
})

export const transactionSchema = z.object({
  notes: z.string().optional().nullable(),
  payee: z.string(),
  amount: z.string().refine((data) => parseFloat(data) !== 0, {
    message: "Amount cannot be 0."
  }),
  date: z.coerce.date(),
  categoryId: z.string().optional().nullable(),
  accountId: z.string(),
  projectId: z.string().optional().nullable()
})
