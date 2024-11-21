'use server'
import {cookies} from "next/headers";
import useSWR from "swr";
/**
 * Send daily feeling
 * @param feeling
 * @returns {Promise<void>}
 */
export async function sendCurrentFeeling(feeling) {
    // Call route that sends feeling
    return {
        success: true
    }
}

export async function setCookies(newCookies) {
    const cookieStore = await cookies()
    for (let cookie in newCookies) {
        console.log(cookie, newCookies[cookie])
        cookieStore.set(cookie, newCookies[cookie])
    }
    return true
}

/**
 * Bookmark a post for the user
 * @param postId
 * @param accessToken
 * @returns {Promise<{success: boolean}>}
 */
export async function bookmarkPost(postId, accessToken) {
    // TODO: Make this actually work
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/user/bookmark/${postId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log(response)
    if (!response.ok) {
        return {
            marked: false,
        }
    }
    return {
        marked: true
    }
}

export async function unbookmarkPost(postId, accessToken) {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/user/bookmark/${postId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (!response.ok) {
        return {
            marked: true,
        }
    }
    return {
        marked: false
    }
}

export async function moodsAndFeelingsForTheDay(state) {
    // send to server
}