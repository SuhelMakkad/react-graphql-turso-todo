import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string({ required_error: "Please enter your email" }).email(),
  password: z
    .string({ required_error: "Please enter your password" })
    .trim()
    .min(5, {
      message: "Password must contain at least 5 characters",
    }),
});

export type Credentials = z.infer<typeof credentialsSchema>;
