import z from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(63, "Username must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hypens.It must start or end with a letter or number"
    )
    .refine(
      (val) => !val.includes("--"),
      "username cannot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
