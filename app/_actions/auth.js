"use server";
// import {SignJWT, JWTVer} from 'jose'
import {
    SignUpFormSchema,
    SignInFormSchema,
    ForgotPasswordFormSchema,
    PasswordResetSchema,
} from "../auth/lib/definitions";
import {cookies} from "next/headers";
import {HOSTNAME_URI} from "@/app/_config/main";
import {matchUserStatus, putColonBack} from "@/app/_lib/functions";
import {getLocalCookies} from "@/app/_lib/getCookies";
import posthog from "posthog-js";
import {Log} from "@/app/_lib/utils";


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
    const fields = {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        email: formData.get('email'),
        phone_number: formData.get('phone'),
        password: formData.get('password'),
        date_of_birth: formData.get('dob')
    }

    Log({fields});
    const validatedFields = SignUpFormSchema.safeParse(fields)

    // return early if there is an error
    if (!validatedFields.success) {
        return {
            success: false,
            fieldErrors: validatedFields.error.flatten().fieldErrors,
            serverError: undefined,
        }
    }

    // call the provider
    try {
        posthog.capture('user_signup_attempt', {method: 'email'});
        const response = await fetch(`${HOSTNAME_URI}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        })
        const errors = []
        console.log({response});
        const result = await response.json();
        console.log({result});

        if (!response.ok) {
            for (const err in result) {
                errors.push(result[err]);
            }

            return {
                success: false,
                fieldErrors: undefined,
                serverError: errors,
            }
        }

        const emailRequest = await requestEmailVerification(formData.get('email'));

        if (emailRequest?.success) {
            return {
                success: true,
                token: result.tokens.access,
                route: `/auth/verify-email/`
            }
        }

        return {
            success: true,
            token: result.tokens.access,
            route: `/auth/verify-email`
        }
    } catch (errors) {
        Log({errors})

        return {
            success: undefined,
            fieldErrors: undefined,
            serverError: true,
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
        const response = await fetch(`${HOSTNAME_URI}/auth/login/`, {
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
        // Log({result});
        // Log({response})

        const errors = []
        if (!response.ok) {
            // for (const key in result) {
            //     errors.push(result[key][0])
            // }
            // Log("auth.js; Signin failed", {result})

            if (response.status === 401 && result.code === "auth/email-not-verified") {
                const email = formData.get('email')
                Log("auth.js; Email verification request object", {email});

                const emailRequest = await requestEmailVerification(email);
                Log("auth.js: emailRequest (var) response", {emailRequest});

                // route the user
                if (emailRequest?.success) {
                    return {
                        success: true,
                        token: false,
                        route: '/auth/verify-email/'
                    }
                }
            }
            return {
                success: false,
                error: [result.message]
            }
        }

        let cookieStore = await cookies()
        cookieStore.set('access_token', result.tokens.access)
        cookieStore.set('refresh_token', result.tokens.refresh)
        cookieStore.set('ttym-user-type', matchUserStatus(result.user.status, true));

        Log({result});
        if (!result.user.is_configured) {
            cookieStore.set('last_login', null)
        } else {
            cookieStore.set('last_login', result.user.last_login)
        }
        // const user = result.user
        // const userUUID = user.uuid;
        //
        // const userDetails = {
        //     username: user.username,
        //     email: user.email,
        //     status: user.status
        // }

        // posthog.identify(userUUID, userDetails);

        return {
            success: true,
            token: result.tokens.access,
            route: result.user.status !== "UNASSIGNED" ? '/dashboard' : `/onboarding`
        }
    } catch (errors) {
        return {
            error: [errors.error_description]
        }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    const items = ['access_token', 'refresh_token', 'last_login', 'ttym-user-type', 'user_email']
    try {
        const response = await fetch(`${HOSTNAME_URI}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                refresh: refreshToken,
            })
        })

        const result = await response.json()
        const errors = []
        if (!response.ok) {
            Log(result)
            for (const key in result) {
                errors.push(result[key][0])
            }
            return {
                success: false,
                error: errors
            }

        }
        Log('auth.js; log out success');
        for (const item of items) {
            cookieStore.delete(item)
        }

        return {
            success: true,
        }
    } catch (errors) {
        Log("auth.js; Logout unsuccessful");
        return {
            error: errors
        }
    }
}

export async function requestEmailVerification(email) {
    const logMsg = 'auth.js; requestEmailVerification; requesting email verification'
    Log(logMsg, {HOSTNAME_URI})

    // save email to cookies
    const cookieStore = await cookies();
    cookieStore.set('user_email', email);

    const res = await fetch(`${HOSTNAME_URI}/auth/verify-email/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    const response = await res.json();

    if (!res.ok) {
        Log(logMsg, {res});
        Log(logMsg, {response})
        return {
            success: false,
            fieldErrors: undefined,
            serverErrors: undefined
        }
    }
    Log(`${logMsg}: success in requesting`)

    return {
        success: true,
        fieldErrors: undefined,
        serverErrors: undefined
    }
}


export async function initiatePasswordChange(state, formData) {
    const validatedField = ForgotPasswordFormSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedField.success) {
        return {
            fieldErrors: validatedField.error.flatten().fieldErrors,
            serverError: false,
            success: false
        }
    }
    const res = await fetch(`${HOSTNAME_URI}/auth/reset-password/request/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: formData.get('email')})
    })
    const response = await res.json()

    if (!res.ok) {
        Log(res.statusText);
        Log(response);
        return {
            fieldErrors: false,
            serverError: true,
            success: false
        }
    }
    return {
        fieldErrors: false,
        serverError: false,
        success: true
    }
}


/**
 * Validates forgotPassword email form
 * @param state
 * @param formData
 * @returns {Promise<{success: boolean}|{errors: {email?: string[]}}>}
 */
export async function changePassword(state, formData) {
    const validateField = PasswordResetSchema.safeParse({
        password: formData.get('password'),
    })

    if (!validateField.success) {
        return {
            fieldErrors: validateField.error.flatten().fieldErrors,
            success: undefined
        }
    }

    Log({HOSTNAME_URI, validateField, key: formData.get('key')})
    const requestBody = JSON.stringify({
        password: formData.get('password'),
        token: putColonBack(formData.get('key'))
    })

    Log(requestBody);
    const res = await fetch(`${HOSTNAME_URI}/auth/reset-password/confirm/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody
    })

    if (!res.ok) {
        Log({res});
        Log(res.statusText);
        return {
            success: false
        }
    }
    const response = await res.json();
    Log(response);

    return {
        success: true
    }
}
