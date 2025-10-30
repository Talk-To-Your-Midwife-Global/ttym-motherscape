"use server"
import {emailSchema, ProfileSettingsSchema} from "@/app/auth/lib/definitions";
import posthog from "posthog-js";
import {CURRENTROUTE, HOSTNAME_URI} from "@/app/_config/main";
import {Log} from "@/app/_lib/utils";
import {getLocalCookies} from "@/app/_lib/getCookies";

export async function updateUserEmail(email) {
    const {access_token} = await getLocalCookies(['access_token']);

    const validatedFields = emailSchema.safeParse({
        email: email
    })

    if (!validatedFields.success) {
        return {
            fieldErrors: validatedFields.error.flatten().fieldErrors,
            serverError: undefined,
            success: undefined
        }
    }

    try {
        const reqBody = {
            email: email,
        }
        const res = await fetch(`${HOSTNAME_URI}/auth/update/email/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${access_token}`,
                'X-Client-Origin': CURRENTROUTE,
            },
            body: JSON.stringify(reqBody)
        })
        const response = await res.json();
        Log(`userProfileAndSettings.js: updateUserEmail();`, {response});

        if (!res.ok) {
            Log(`userProfileAndSettings.js: updateUserEmail(); ${JSON.stringify(response)}`)
            posthog.captureException(`userProfileAndSettings.js: updateUserEmail(); ${JSON.stringify(response)}`);
            return {
                serverError: true,
                message: response.message,
                fieldErrors: undefined,
                success: undefined
            }
        }
        return {
            serverError: undefined,
            fieldErrors: undefined,
            success: true
        }
    } catch (error) {
        Log(`userProfileAndSettings.js: updateUserProfile(); ${JSON.stringify(error)}`)
        posthog.captureException(`userProfileAndSettings.js: updateUserProfile(); ${JSON.stringify(error)}`);
    }


}


export async function updateUserProfile(state, formData) {
    const {access_token} = await getLocalCookies(['access_token']);

    const validatedFields = ProfileSettingsSchema.safeParse({
        full_name: formData.get('fullName'),
        email: formData.get('email'),
        phone_number: formData.get('phone')
    })

    if (!validatedFields.success) {
        return {
            fieldErrors: validatedFields.error.flatten().fieldErrors,
            serverError: undefined,
            success: undefined
        }
    }
    try {
        const reqBody = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            phone_number: formData.get('phone')
        }
        const res = await fetch(`${HOSTNAME_URI}/user/`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(reqBody)
        })
        const response = await res.json();
        Log(`userProfileAndSettings.js: updateUserProfile();`, {response});
        if (!res.ok) {
            posthog.captureException(`userProfileAndSettings.js: updateUserProfile(); ${JSON.stringify(response)}`);
            return {
                serverError: true,
                fieldErrors: undefined,
                success: undefined
            }
        }
        return {
            serverError: undefined,
            fieldErrors: undefined,
            success: true
        }
    } catch (error) {
        posthog.captureException(`userProfileAndSettings.js: updateUserProfile(); ${JSON.stringify(error)}`);
    }
}