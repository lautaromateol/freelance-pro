import { z } from "zod";

export const clientSchema = z.object({
  name: z.string()
})