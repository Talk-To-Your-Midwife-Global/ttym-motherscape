"use server";
// import {SignJWT, JWTVer} from 'jose'
import {
    SignUpFormSchema,
    SignInFormSchema,
    ForgotPasswordFormSchema,
    PasswordResetSchema,
} from "../auth/lib/definitions";
import {cookies} from "next/headers";
import {CURRENTROUTE, HOSTNAME_URI} from "@/app/_config/main";
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
export async function refreshUserAccessToken() {
    const functionExceptionTag = "auth.js; refreshUserAccessToken()"
    const {refresh_token} = await getLocalCookies(['refresh_token']);
    let jsonBody;
    if (refresh_token) {
        jsonBody = JSON.stringify({
            refresh: refresh_token
        })
    } else {
        posthog.captureException(`${functionExceptionTag} missing refresh_token, ${JSON.stringify({jsonBody})}`);
        return {
            serverError: true,
            message: "refresh token not found",
            success: false
        }
    }

    try {
        console.log("Refresh token as JSON body", jsonBody);
        const request = await fetch(`${HOSTNAME_URI}/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-Client-Origin': CURRENTROUTE,
            },
            body: jsonBody
        })
        console.log({request})
        if (!request.ok) {
            const errMessage = `${functionExceptionTag} request not okay: ${JSON.stringify({
                request,
                response: await request.json()
            })}`
            posthog.captureException(errMessage)

            return {
                serverError: true,
                message: errMessage,
                success: false,
            }
        }

        const response = await request.json();
        console.log({response});

        const cookieStore = await cookies();
        if (response.access && response.refresh) {
            cookieStore.set({
                name: "access_token",
                value: response.access,
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60
            });
            cookieStore.set({
                name: "refresh_token",
                value: response.refresh,
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60
            });
            return {
                serverError: false,
                success: true,
                message: undefined
            }
        } else {
            const errMessage = `${functionExceptionTag} tokens not in response: ${JSON.stringify({
                request,
                response: await request.json()
            })}`
            return {
                serverError: true,
                message: errMessage,
                success: false,
            }
        }
    } catch (err) {
        const errMessage = `${functionExceptionTag} catch() ${JSON.stringify(err)}`
        posthog.captureException(errMessage);
        return {
            serverError: true,
            message: errMessage,
            success: false,
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

    const cookieStore = await cookies();
    cookieStore.set({
        name: 'user_email',
        value: formData.get('email'),
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        path: "/",
        sameSite: 'Lax'
    });

    // call the provider
    try {
        posthog.capture('user_signup_attempt', {method: 'email'});
        const response = await fetch(`${HOSTNAME_URI}/auth/register/`, {
            method: 'POST',
            headers: {
                'X-Client-Origin': CURRENTROUTE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        })
        const errors = []
        console.log({response, time: new Date()});
        const result = await response.json();
        console.log({result, time: new Date()});

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
        Log("auth.js; field validation failed", {validatedFields});
        return {
            state: {
                email: formData.get('email'),
            },
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const jsonBody = JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
    })

    Log("auth.js body for signin", {jsonBody})

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
        Log({result});
        Log({response})

        const errors = []
        if (!response.ok) {
            // for (const key in result) {
            //     errors.push(result[key][0])
            // }
            Log("auth.js; Signin failed", {result})

            const userIsUnAuthorized = response.status === 401;
            if (userIsUnAuthorized) {
                const email = formData.get('email')
                Log("auth.js; Email verification request object", {email});

                const emailRequest = await requestEmailVerification(email);
                Log("auth.js: emailRequest (var) response", {emailRequest});

                // route the user
                if (emailRequest?.success) {
                    return {
                        success: false,
                        token: false,
                        shouldVerifyEmail: true,
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
        cookieStore.set({
            name: 'access_token',
            value: result.tokens.access,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60
        })
        cookieStore.set({
            name: 'refresh_token',
            value: result.tokens.refresh,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60
        })
        cookieStore.set({
            name: 'ttym-user-type',
            value: matchUserStatus(result.user.status, true),
            httpOnly: true,
            sameSite: 'lax',
        });

        Log({result});
        Log("auth.js",)
        if (!result.user.is_configured) {
            cookieStore.set({
                name: 'last_login',
                value: null,
                httpOnly: true,
                sameSite: 'lax',
            })
        } else {
            cookieStore.set({
                name: 'last_login',
                value: result.user.last_login,
                httpOnly: true,
                sameSite: 'lax',
            })
        }
        const user = result.user
        const userDetails = {
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            status: user.status
        }
        return {
            success: true,
            token: result.tokens.access,
            route: result.user.menstrual_profile_created ? '/dashboard' : `/onboarding`,
            userDetails
        }
    } catch (errors) {
        return {
            error: [errors.error_description]
        }
    }
}

export async function logout() {
    const cookieStore = await cookies();
    const {access_token, refresh_token} = await getLocalCookies(['access_token', 'refresh_token'])
    Log(`auth.js; Logout unsuccessful`, {access_token, refresh_token})

    const items = ['access_token', 'refresh_token', 'last_login', 'ttym-user-type', 'user_email']
    try {
        const response = await fetch(`${HOSTNAME_URI}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                refresh: refresh_token,
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
        for (const item of items) {
            cookieStore.delete(item)
        }

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
            'X-Client-Origin': CURRENTROUTE,
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


export async function initiatePasswordChange(formData) {
    const validatedField = ForgotPasswordFormSchema.safeParse({
        email: formData.email,
    })
    Log("initiatePasswordChange", {formData});
    if (!validatedField.success) {
        return {
            fieldErrors: validatedField.error.flatten().fieldErrors,
            serverError: false,
            success: false
        }
    }

    try {
        const res = await fetch(`${HOSTNAME_URI}/auth/reset-password/request/`, {
            method: 'POST',
            headers: {
                'X-Client-Origin': CURRENTROUTE,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: formData.email})
        })
        const response = await res.json()

        if (!res.ok) {
            Log(res.statusText);
            Log(response);
            posthog.captureException(`auth.js: initiatePasswordChange() unsuccessful res: ${JSON.stringify(response)}`, {
                errorMessage: JSON.stringify(response)
            });
            return {
                fieldErrors: false,
                serverError: true,
                success: false,
                message: response.message
            }
        }
        return {
            fieldErrors: false,
            serverError: false,
            success: true
        }
    } catch (err) {
        posthog.captureException(`auth.js: initiatePasswordChange() catch block: ${JSON.stringify(err)}`);
        return {
            fieldErrors: false,
            serverError: true,
            success: false
        }
    }

}


/**
 * Validates forgotPassword email form
 * @param formData
 * @returns {Promise<{success: boolean}|{errors: {email?: string[]}}>}
 */
export async function changePassword(formData) {
    const validateField = PasswordResetSchema.safeParse({
        password: formData.password,
    })

    if (!validateField.success) {
        return {
            fieldErrors: validateField.error.flatten().fieldErrors,
            success: undefined
        }
    }

    Log({HOSTNAME_URI, validateField, key: formData.key})
    const requestBody = JSON.stringify({
        password: formData.password,
        token: putColonBack(formData.key)
    })

    Log({requestBody});
    try {
        const res = await fetch(`${HOSTNAME_URI}/auth/reset-password/confirm/`, {
            method: 'POST',
            headers: {
                'X-Client-Origin': CURRENTROUTE,
                'Content-Type': 'application/json',
            },
            body: requestBody
        })

        if (!res.ok) {
            const data = await res.json();
            Log({res, data});
            Log(res.statusText);
            return {
                fieldErrors: false,
                success: false,
                serverError: true
            }
        }
        const response = await res.json();
        Log(response);

        return {
            fieldErrors: false,
            serverError: false,
            success: true
        }
    } catch (err) {
        Log({err})
        posthog.captureException(`auth.js: changePassword(); catch block error ${JSON.stringify(err)}`);
    }
}
