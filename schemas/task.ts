import { z } from "zod";

export const taskSchema = z.object({
  description: z.string(),
  listId: z.string()
})

export const taskUpdateSchema = z.object({
  description: z.string().optional(),
  listId: z.string().optional(),
  order: z.number().optional()
})