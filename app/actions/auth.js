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
                role: role,
            }),
        })

        const result = await response.json()
        console.log(result)

        if (result) {
            return {
                success: true
            }
        }

    }catch(errors) {
        console.log(errors)
        // TODO: setup a logger here

        return {
            error: errors.error_description
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
        console.log(HOSTNAME)
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
        console.log(result)

        if (result) {
            let cookieStore = await cookies()
            cookieStore.set('access_token', result.tokens.access)
            cookieStore.set('refresh_token', result.tokens.refresh)

            if (result.last_login !== null) {
                cookieStore.set('last_login', result.user.last_login)
            }

            return {
                success: true,
                token: result.tokens.access
            }
        } else {
            return {
                success: false
            }
        }

    }catch(errors) {
        return {
            state: {
                error: errors.error_description
            }
        }
    }
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
