'use server'
import {SignUpFormSchema, SignInFormSchema, ForgotPasswordFormSchema} from "../auth/lib/definitions";
import { cookies } from "next/headers";

/**
 * Validates sign up form fields
 * @param {action state} state 
 * @param {formData} formData 
 * @returns 
 */
export async function signup(state, formData) {
    
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
    const signupResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          email: formData.get('email'),
          password: formData.get('password'),
          user_metadata: {
            phone: formData.get('phone')
          },
          connection: 'Username-Password-Authentication',
        }),
      });

      const signUpResult = await signupResponse.json();
      console.log(signUpResult);

      if (signUpResult) {
        return {
            success: true
        }
    }

    }catch(error) {
        // setup logging with slack
        console.log(error)  
        return {
            error: error.error_description
        }
    }
}

/**
 * Validates sign in form fields
 * @param {action state} state
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
            //   Automatic login and verification
        const loginResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            username: formData.get('email'),
            password: formData.get('password'),
            realm: 'Username-Password-Authentication',
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        }),
        });

        const loginResult = await loginResponse.json();
        console.log(loginResult)
        if (loginResult.access_token) {
        // Save token in local storage or cookies
        let cookieStore = await cookies()
        cookieStore.set('access_token', loginResult.access_token)
        return {
            success: true,
            token: loginResult.access_token
        }
        } else {
            return {
                success: false
                
            }
        }
    } catch (error) {
        console.log(error)
        return {
            state: {
                error: error.error_description
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