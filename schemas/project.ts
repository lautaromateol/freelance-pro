import { z } from "zod";

export const projectSchema = z.object({
  name: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  budget: z.string(),
  status: z.enum(["IN_PROGRESS", "COMPLETE"]),
  clientId: z.string()
})

export const projectApiSchema = z.object({
  name: z.string(),
  releaseDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  budget: z.number(),
  status: z.enum(["IN_PROGRESS", "COMPLETE"]),
  clientId: z.string()
})