import { z } from "zod";

export const taskSchema = z.object({
  description: z.string(),
  listId: z.string()
})

export const taskUpdateSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
  listId: z.string().optional(),
})