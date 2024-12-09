import { z } from "zod";

export const listSchema = z.object({
  name: z.string().min(1, {
    message: "Insert a name."
  }),
  projectId: z.string()
})

export const listToUpdate = z.object({
  id: z.string(),
  name: z.string().optional().refine(val => val !== '', {
    message: 'Insert a name.'
  }),
  order: z.number().optional()
})