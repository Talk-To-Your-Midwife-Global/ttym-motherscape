"use server"
import {cookies} from "next/headers"
import {HOSTNAME_URI} from "@/app/_config/main";
import {matchUserStatus} from "@/app/_lib/functions";
import {convertCommaStringToArray} from "@/app/dashboard/lib/functions";

import {Log} from "@/app/_lib/utils";

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
    Log(config)
    Log(info)
    Log(HOSTNAME_URI)
    const dataInput = {
        // lmp: info?.lmp, todo: add this back
        delivery_date_est: info?.dueDate,
        complications: convertCommaStringToArray(info.existingConditions),
        history: {
            underlying_conditions: convertCommaStringToArray(info.existingConditions),
            medications: convertCommaStringToArray(info?.existingMedications),
            allergies: convertCommaStringToArray(info?.allergies),
            previous_complications: convertCommaStringToArray(info?.pastComplications)
        },
        is_first: info.isFirstPregnancy
    };
    Log({dataInput});

    try {
        const response = await fetch(`${HOSTNAME_URI}/user/pregnancy/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.accessToken}`
            },
            body: JSON.stringify(dataInput)
        })
        Log({info})

        if (!response.ok) {
            Log("error occured", {response}, 'Status Text\T', response.statusText);
        }
        const data = await response.json();
        // Log({data})

        return {
            success: true,
            // data: response.json()
        };
    } catch (error) {
        // setup logger here]
        Log({error})
    }
}

export async function updateUser(info) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = matchUserStatus(cookieStore.get('ttym-user-type')?.value);

    Log({info})
    const data = {
        cycle_length: info.cycleInfo,
        period_length: info.periodLength,
        // is_consistent: info.cycleRegularity,
        last_period_start: info.periodStart,

    }

    Log("Something is sending; data")
    Log({data})
    try {
        const response = await fetch(`${HOSTNAME_URI}/menstrual/profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(data)
        })
        Log({info});
        if (!response.ok) {
            const errRes = await response.json();
            Log("An error occured", {errRes})
        }
        const json = await response.json()
        if (json) {
            Log('user_profile_submit', {json})
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
