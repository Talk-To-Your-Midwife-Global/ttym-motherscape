'use server'
import {SignUpFormSchema, SignInFormSchema, ForgotPasswordFormSchema} from "../auth/lib/definitions";
import { cookies } from "next/headers";
import {HOSTNAME} from "../config/main";


async function patientOrMidwife() {
    const cookieStore = await cookies()
    if (cookieStore.has('ttym-user-type')) {
        if (cookieStore.get('ttym-user-type') !== 'midwife' ) {
            return 'PATIENT'
        }else {
            return 'MIDWIFE'
        }
    }
}

/**
 * Validates sign up form fields
 * @param {state} state
 * @param {formData} formData 
 * @returns 
 */
export async function signup(state, formData) {
    const role = await patientOrMidwife()
    // validate user fields
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password')
    })

    // return early if there is an error
    if (!validatedFields.success) {
        return {
            state: {
                email: formData.get('email'),
                address: formData.get('address'),
            },
            errors: validatedFields.error.flatten().fieldErrors,
          }
    }

    // call the provider
    try {
        const response = await fetch(`http://${HOSTNAME}:8000/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone_number: formData.get('phone'),
                role,
            }),
        })
        const result = await response.json()
        const errors = []
        if (!response.ok) {
            for(const key in result) {
                errors.push(result[key][0])
            }
            return {
                success: false,
                error: errors
            }
        }
        let cookieStore = await cookies()
        cookieStore.set('access_token', result.tokens.access, {httpOnly: true, path: '/'})
        cookieStore.set('refresh_token', result.tokens.refresh, {httpOnly: true, path: '/'})
        return {
            success: true,
            token: result.tokens.access,
            route: '/questions'
        }
    } catch(errors) {
        console.log(errors)
        // TODO: setup a logger here

        return {
            error: [errors.error_description]
        }
    }
}

/**
 * Validates sign in form fields
 * @param {state} state
 * @param {formData} formData
 * @returns
 */
export async function signin(state, formData) {
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    // return early if there is an error
    if (!validatedFields.success) {
        return {
            state: {
                email: formData.get('email'),
            },
            errors: validatedFields.error.flatten().fieldErrors,
          }
    }

    try {
        const response = await fetch(`http://${HOSTNAME}:8000/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            })
        })

        const result = await response.json()
        const errors = []
        if(!response.ok) {
            for (const key in result) {
                errors.push(result[key][0])
            }
            console.log(errors)
            return {
                success: false,
                error: errors
            }
        }

        let cookieStore = await cookies()
        cookieStore.set('access_token', result.tokens.access)
        cookieStore.set('refresh_token', result.tokens.refresh)

        if (!result.is_configured) {
            cookieStore.set('last_login', null)
        } else {
            cookieStore.set('last_login', result.user.last_login)
        }
        return {
            success: true,
            token: result.tokens.access,
            route: result.user.is_configured  ? '/dashboard' : '/questions'
        }
    } catch(errors) {
        return {
            error: [errors.error_description]
        }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    const items = ['access_token', 'refresh_token', 'last_login', 'ttym-user-type']
    for(const item of items) {
        cookieStore.delete(item)
    }

//TODO: Implement the logout
}

/**
 * Validates forgotPassword email form
 * @param state
 * @param formData
 * @returns {Promise<{success: boolean}|{errors: {email?: string[]}}>}
 */
export async function forgotPassword(state, formData) {
    const validateField = ForgotPasswordFormSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validateField.success) {
        return {
            errors: validateField.error.flatten().fieldErrors,
        }
    }

    // TODO: You can remove this but make sure it is part of the return statement when the real thing is done
    return {
        success: true
    }
    // TODO: Make an api call to forgot password route

    // Return a message indicating success
}
