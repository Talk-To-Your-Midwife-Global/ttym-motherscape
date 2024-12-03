"use server"
import {cookies} from "next/headers"
import {HOSTNAME} from "@/app/config/main";
import {matchUserStatus} from "@/app/lib/functions";

export async function storeUserType(userType) {
    const cookieStore = await cookies();
    cookieStore.set('ttym-user-type', userType)
    return {
        status: true
    }
}

export async function updateUser(info) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = matchUserStatus(cookieStore.get('ttym-user-type')?.value);

    try {
        const response = await fetch(`http://${HOSTNAME}/user/patient/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                cycle_length: info.cycleInfo,
                period_length: info.periodLength,
                is_regular_cycle: info.cycleRegularity,
                last_period_start: info.periodStart,
                tracking_pref: {
                    moods: info.moods,
                    symptoms: info.symptoms,
                },
                notification_pref: info.notificationPreference,
                status: userType
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
                    error_description: json,
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            error: {
                error_description: error,
            }
        }
    }
}
