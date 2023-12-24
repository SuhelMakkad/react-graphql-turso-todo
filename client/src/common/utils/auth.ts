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

export const userSchema = credentialsSchema.extend({
  firstName: z
    .string()
    .min(3, { message: "Must be greater than 3" })
    .max(20, { message: "Must be less than 20" }),
  lastName: z
    .string()
    .min(3, { message: "Must be greater than 3" })
    .max(20, { message: "Must be less than 20" }),
});

export type UserSchema = z.infer<typeof userSchema>;
