import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(5, { message: "Full name is required" }),
  email: z
    .string()
    .email({ message: "The email is not valid." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(7, {
      message:
        "Password must be at least 7 characters and contain at least one uppercase letter.",
    })
    .regex(/^(?=.*[A-Z]).{7,}$/, {
      message:
        "The password must be at least 7 characters and contain at least one uppercase letter.",
    }),
});
