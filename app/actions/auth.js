'use server'
// import {SignJWT, JWTVer} from 'jose'
import {SignUpFormSchema, SignInFormSchema, ForgotPasswordFormSchema} from "../auth/lib/definitions";
import {cookies} from "next/headers";
import {HOSTNAME} from "../config/main";


// const secretKey = 'somekeybiIwillmakeinenvironmentvairables'
// const key = new TextEncoder().encode(secretKey);
//
// export async function encrypt(payload) {
//     return await SignJWT(payload)
//         .setProtectedHeader({alg: 'HS256'})
//         .setIssuedAt()
//         .setExpirationTime('time goes here')
//         .sign(key)
// }
//
// export async function decrypt(input) {
//     const {payload} = await JWTVerify(input, key,  {
//         algorithms: ['HS256'],
//     })
//
//     return payload
// }


async function patientOrMidwife() {
    const cookieStore = await cookies()
    if (cookieStore.has('ttym-user-type')) {
        if (cookieStore.get('ttym-user-type') !== 'midwife') {
            return 'PATIENT'
        } else {
            return 'MIDWIFE'
        }
    }
}

export async function returnTypeOfPatient() {
    const cookieStore = await cookies();
    if (cookieStore.has('ttym-user-type')) {
        return cookieStore.get('ttym-user-type')?.value || null;
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

    //  console.log(HOSTNAME)
    // call the provider
    try {
        const response =
            await fetch(`${HOSTNAME}/auth/register/`, {
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
        cookieStore.set('access_token', result.tokens.access, {httpOnly: true, path: '/'})
        cookieStore.set('refresh_token', result.tokens.refresh, {httpOnly: true, path: '/'})
        return {
            success: true,
            token: result.tokens.access,
            route: `/questions`
        }
    } catch (errors) {
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
        const response = await fetch(`${HOSTNAME}/auth/login/`, {
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
        console.log(result);
        const errors = []
        if (!response.ok) {
            // for (const key in result) {
            //     errors.push(result[key][0])
            // }
            console.log(result)
            return {
                success: false,
                error: [result.message]
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
            route: result.user.is_configured ? '/dashboard' : `/questions`
        }
    } catch (errors) {
        return {
            error: [errors.error_description]
        }
    }
}

export async function logout() {
    console.log('logging out')
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    const items = ['access_token', 'refresh_token', 'last_login', 'ttym-user-type']

    try {
        const response = await fetch(`${HOSTNAME}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            })
        })

        const result = await response.json()
        const errors = []
        if (!response.ok) {
            console.log(result)
            for (const key in result) {
                errors.push(result[key][0])
            }
            console.log({
                    success: false,
                    error: errors
                }
            )
        }
        console.log('log out success')
        for (const item of items) {
            cookieStore.delete(item)
        }

        return {
            success: true,
        }
    } catch (errors) {
        return {
            error: errors
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
