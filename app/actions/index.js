"use server"
import { cookies } from "next/headers"
import {HOSTNAME} from "@/app/config/main";

export async function storeUserType(userType) {
    const cookieStore = await cookies();
    cookieStore.set('ttym-user-type', userType)
    return {
        status: true
    }
}

export async function updateUser(info) {
    const cookieStore = await cookies();
    try {
        const response = await fetch(`http://${HOSTNAME}/:8000/user/patient/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieStore.get('access_token')
            },
            body: JSON.stringify({
                cycle_length: info.cycleInfo,
                period_length: info.periodLength,
                is_regular_cycle: info.cycleRegularity,
                period_start: info.periodStart,
                moods: info.moods,
                symptoms: info.symptoms,
                notification_pref: info.notificationPreference
            })
        })
        const json = await response.json()
        if (json) {
            return {
                success: true,
            }
        } else {
            return {
                success: false,
                error: {
                    error_description: "Something went wrong",
                }
            }
        }
        } catch (error) {
            return {
                success: false,
                error: {
                    error_description: "Something went wrong",
                }
            }
    }
}
