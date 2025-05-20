'use server'
import {cookies} from "next/headers";
import {PUBLICHOSTNAME} from "@/app/_config/main";

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

export async function contentGqlFetcher(query, variables) {
    // todo: remove all the console logs
    // console.log('Fetcher itself')
    console.log(JSON.stringify({query, variables}));
    // console.log({contentful_token: process.env.CONTENTFUL_TOKEN, contentful_id: process.env.CONTENTFUL_SPACE_ID});
    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CONTENTFUL_TOKEN}`
            },
            body: JSON.stringify({query, variables})
        })

    if (!response.ok) {
        // throw new Error(response.statusText)
    }

    const {data, errors} = await response.json();
    console.log(data);
    return data;
}


export async function bookmarkPost(postId, accessToken) {
    // TODO: Make this actually work
    const response = await fetch(`${PUBLICHOSTNAME}/user/bookmark/${postId}`, {
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
    const response = await fetch(`${PUBLICHOSTNAME}/user/bookmark/${postId}`, {
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

export async function moodsAndFeelingsForTheDay(state, accessToken) {
    // do something
}

export async function logLog(state, accessToken, userType) {
    // console.log(state)
    const response = await fetch(`${PUBLICHOSTNAME}/logs/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            type: userType,
            entry: state
        })
    })
    const res = await response.json()
    if (!response.ok) {
        return {
            success: false,
            data: res
        }
    }

    return {
        data: res
    }
}