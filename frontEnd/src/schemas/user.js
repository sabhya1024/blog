import { z } from "zod"

export const signupSchema = z.object({
    fullname: z.string().min(3, "Full Name must be at least 3 characters long"),
    username: z.string().min(3, "User Name must be at least 3 characters long"),
    email: z.email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signinSchema = z.object({
    email: z.email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

