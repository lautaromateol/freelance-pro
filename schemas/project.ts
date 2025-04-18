import { z } from "zod";

export const projectSchema = z.object({
  name: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  budget: z.string(),
  clientId: z.string()
})

export const projectApiSchema = z.object({
  name: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  budget: z.number(),
  clientId: z.string()
})