import { z } from "zod";

export const taskSchema = z.object({
  description: z.string().min(1, {
    message: "Insert a description."
  }),
  listId: z.string()
})

export const taskUpdateSchema = z.object({
  id: z.string(),
  description: z.string().optional().refine(val => val !== '', {
    message: 'Insert a description.'
  }),
  order: z.number().optional(),
  listId: z.string().optional(),
})