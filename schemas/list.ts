import { z } from "zod";

export const listSchema = z.object({
  name: z.string(),
  projectId: z.string()
})

export const listToUpdate = z.object({
  name: z.string().optional(),
  order: z.number().optional()
})