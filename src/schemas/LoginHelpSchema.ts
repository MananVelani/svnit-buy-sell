import { z } from "zod"


export const loginHelpSchema = z.object({
  email: z.email("Enter a valid email"),
  code: z.string().optional(),
  password: z.string().optional()
})