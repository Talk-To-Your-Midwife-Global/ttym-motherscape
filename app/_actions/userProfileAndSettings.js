"use server"
import {ProfileSettingsSchema} from "@/app/auth/lib/definitions";
import posthog from "posthog-js";
import {HOSTNAME_URI} from "@/app/_config/main";
import {Log} from "@/app/_lib/utils";
import {getLocalCookies} from "@/app/_lib/getCookies";

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