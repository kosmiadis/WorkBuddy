import z from "zod";

export const loginSchema = z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

export const registerSchema = z.object({
    firstName: z.string().nonempty('Please enter a first name'),
    lastName: z.string().nonempty('Please enter a last name'),
    email: z.email('Please enter an email'),
    password: z.string().nonempty('Please enter a password'),
})

export const resetPasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string()
}).refine(({ currentPassword, newPassword }) => currentPassword.length >= 8 && newPassword.length >= 8, {
    path: ['reset-password'],
    message: 'Password must be at least 8 characters long'
}).refine(({ currentPassword, newPassword }) => currentPassword != newPassword ,{
    path: ['reset-password'],
    message: 'New password must be different from current password'
})