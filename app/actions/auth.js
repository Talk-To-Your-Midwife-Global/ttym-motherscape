'use server'
import { SignUpFormSchema, SignInFormSchema } from "../auth/lib/definitions";
import { cookies } from "next/headers";

/**
 * 
 * @param {action state} state 
 * @param {formData} formData 
 * @returns 
 */
export async function signup(state, formData) {
    
    // validate user fields
    const validatedFields = SignUpFormSchema.safeParse({
        email: formData.get('email'),
        address: formData.get('address'),
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
    const signupResponse = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          email: formData.get('email'),
          password: formData.get('password'),
          user_metadata: {
            address: formData.get('address')
          },
          connection: 'Username-Password-Authentication',
        }),
      });

      const signUpResult = await signupResponse.json();

      if (signUpResult) {
        return {
            success: true
        }
    }

    }catch(error) {
        // setup logging with slack
        console.log(error)  
    }
}

export async function signin(state, formData) {
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    // return early if ther is an error
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
        const loginResponse = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,  // Set this in your server environment
            username: formData.get('email'),
            password: formData.get('password'),
            realm: 'Username-Password-Authentication',
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        }),
        });

        const loginResult = await loginResponse.json();
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
    }
        
}
