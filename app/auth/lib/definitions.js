import {z} from "zod"

export const SignUpFormSchema = z.object({
    first_name: z
        .string()
        .min(2, {message: 'Invalid first name.'})
        .trim(),
    last_name: z
        .string()
        .min(2, {message: 'Invalid last name.'})
        .trim(),
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    // address: z.string().min(5, {message: 'Must be at least 5 characters long'}).trim(),
    phone_number: z.string().regex(
        /^\+\d{1,3}\d{7,14}$/,
        {message: "Please enter a valid phone number."}
    ),
    password: z
        .string()
        .min(8, {message: 'Be at least 8 characters long.'})
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


export const waitListFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"}),
    firstName: z.string().min(1, {message: "First name is required"}),
    lastName: z.string().min(1, {message: "Last name is required"}),
});

export const ProfileSettingsSchema = z.object({
    full_name: z.string().min(5, {message: "Full name is required"}),
    email: z.string().email({message: "Please enter a valid email address"}),
    phone_number: z.string().regex(
        /^\+\d{1,3}\d{7,14}$/,
        {message: "Please enter a valid phone number."}
    ),
})