import { object, string, TypeOf } from "zod";

export const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must include at least one uppercase letter"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must include at least one number"
    )
    .refine(
      (value) => /[!@#$%^&*]/.test(value),
      "Password must include at least one special character"
    ),
});

export const checkEmailSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

export const registerSchema = object({
  firstname: string().min(1, "first name is required").max(100),
  lastname: string().min(1, "first name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must include at least one uppercase letter"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must include at least one number"
    )
    .refine(
      (value) => /[!@#$%^&*]/.test(value),
      "Password must include at least one special character"
    ),
});
