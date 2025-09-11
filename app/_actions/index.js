"use server"
import {cookies} from "next/headers"
import {HOSTNAME_URI} from "@/app/_config/main";
import {matchUserStatus} from "@/app/_lib/functions";
import {convertCommaStringToArray} from "@/app/dashboard/lib/functions";

import {Log, USERTYPE} from "@/app/_lib/utils";
import {getLocalCookies} from "@/app/_lib/getCookies";

export async function storeUserType(userType) {
    const cookieStore = await cookies();
    cookieStore.set('ttym-user-type', userType)
    return {
        status: true
    }
}

export async function updatePregnantUser(info) {
    const {access_token} = await getLocalCookies(["access_token"]);
    Log(info)
    Log(HOSTNAME_URI)
    const dataInput = {
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
                'Authorization': `Bearer ${access_token}`
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

export async function updateUserStatus(status = USERTYPE.unassigned) {
    const {access_token} = await getLocalCookies(["access_token"]);
    const bodyValue = JSON.stringify({status});

    const response = await fetch(`${HOSTNAME_URI}/user/`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${access_token}`
        },
        body: bodyValue
    })

    const responseJson = await response.json()

    if (!response.ok) {
        Log("update_user_status", "raw_respone", {response})
        Log("update_user_status", "json", {responseJson})
        throw new Error(`An error occurred while updating user status ${responseJson}`)
        // return false
    }

    Log({responseJson})
    return true
}

export async function updateUser(info) {
    Log({info})
    const {access_token} = await getLocalCookies(["access_token"]);

    const data = {
        cycle_length: info.cycleInfo,
        period_length: info.periodLength,
        last_period_start: info.periodStart,
        notification_pref: "3",
    }
    Log("data to be sent in updateUser()", {data})

    try {
        const response = await fetch(`${HOSTNAME_URI}/menstrual/profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errRes = await response.json();
            Log("An error occured", {errRes})
        }
        const json = await response.json()
        if (json) {
            Log('user_menstrual_profile_submit', {json})
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
