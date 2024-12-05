import { z } from "zod";

export const listSchema = z.object({
  name: z.string(),
  projectId: z.string()
})