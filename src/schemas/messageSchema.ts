import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 characters long")
    .max(20,"Username must not be more than 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")

export const messageSchema = z.object({
    username:usernameValidation,
    content:z.
    string().
    min(10,"Content must be atleast 10 characters long").
    max(300,"Content must be not more than 300 characters long")

})