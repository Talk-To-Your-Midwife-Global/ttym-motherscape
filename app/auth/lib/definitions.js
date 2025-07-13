import {z} from "zod"

export const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(2, {message: 'Name must be at least 2 characters long.'})
        .trim(),
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    // address: z.string().min(5, {message: 'Must be at least 5 characters long'}).trim(),
    phone: z.string().regex(
        /^\+\d{1,3}\d{7,14}$/,
        {message: "Phone number must start with a '+' followed by a 1-3 digit country code and a valid phone number."}
    ),
    password: z
        .string()
        .min(8, {message: 'Be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    date_of_birth: z.string(),
})

export const SignInFormSchema = z.object({
    // name: z
    // .string()
    // .min(2, { message: 'Name must be at least 2 characters long.' })
    // .trim(),
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    password: z
        .string()
        .min(8, {message: 'Be at least 8 characters long'})
        // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { message: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //   message: 'Contain at least one special character.',
        // })
        .trim(),
})

export const ForgotPasswordFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
})

export const PasswordResetSchema = z.object({
    password: z
        .string()
        .min(8, {message: 'Be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
        .regex(/[0-9]/, {message: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim()
})