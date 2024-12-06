"use server"
import {cookies} from "next/headers"
import {HOSTNAME} from "@/app/config/main";
import {matchUserStatus} from "@/app/lib/functions";
import {convertCommaStringToArray} from "@/app/dashboard/lib/functions";

export async function storeUserType(userType) {
    const cookieStore = await cookies();
    cookieStore.set('ttym-user-type', userType)
    return {
        status: true
    }
}

export async function grabConfiguration() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = matchUserStatus(cookieStore.get('ttym-user-type')?.value);

    return {
        accessToken,
        userType,
    }
}

export async function updatePregnantUser(info) {
    const config = await grabConfiguration();
    console.log(config)
    console.log(info)
    console.log(HOSTNAME)
    try {
        const response = await fetch(`${HOSTNAME}/user/pregnancy/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.accessToken}`
            },
            body: JSON.stringify({
                // lmp: info?.lmp,
                start_date: info?.lmp,
                delivery_date_est: info?.dueDate,
                complications: convertCommaStringToArray(info.existingConditions),
                history: {
                    underlying_conditions: convertCommaStringToArray(info.existingConditions),
                    medications: convertCommaStringToArray(info?.existingMedications),
                    allergies: convertCommaStringToArray(info?.allergies),
                    previous_complications: convertCommaStringToArray(info?.pastComplications)
                },
                is_first: info?.isFirstPregnancy
            })
        })

        if (!response.ok) {
            console.log('error occured')
            return {
                error: response.json()
            }
        }

        return {
            success: true,
            // data: response.json()
        };
    } catch (error) {
        // setup logger here]
        console.log(error)
    }
}

export async function updateUser(info) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = matchUserStatus(cookieStore.get('ttym-user-type')?.value);

    try {
        const response = await fetch(`${HOSTNAME}/user/patient/update/`, {
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
