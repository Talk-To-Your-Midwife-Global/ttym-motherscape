'use server'
import {cookies} from "next/headers";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {formatDate} from "@/app/_lib/functions";
import {getLocalCookies} from "@/app/_lib/getCookies";
import {Log} from "@/app/_lib/utils";

export async function sendCurrentFeeling(feeling) {
    // Call route that sends feeling
    return {
        success: true
    }
}

export async function setCookies(newCookies) {
    const cookieStore = await cookies()
    for (let cookie in newCookies) {
        Log(cookie, newCookies[cookie])
        cookieStore.set(cookie, newCookies[cookie])
    }
    return true
}

export async function restartCycle() {
    const today = formatDate(new Date());
    const {access_token} = await getLocalCookies(['access_token']);
    Log(access_token);

    const response = await fetch(`${PUBLICHOSTNAME}/menstrual/start/?period_start=${today}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (!response.ok) {
        Log(response);
        Log(response.statusText)
    }

    const data = await response.json();
    Log(data);

}

export async function contentGqlFetcher(query, variables) {
    // todo: remove all the console logs
    Log(JSON.stringify({query, variables}));
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
        throw new Error(response.statusText)
    }

    const {data, errors} = await response.json();
    Log(data);
    return data;
}


export async function bookmarkPost(postId) {
    const {access_token} = await getLocalCookies(['access_token']);

    const response = await fetch(`${PUBLICHOSTNAME}/bookmark/${postId}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    Log(response)
    if (!response.ok) {
        Log({data});
        return {
            marked: false,
        }
    }
    const data = await response.json();
    Log({data});
    return {
        marked: data.isBookmarked
    }
}


// todo: remove this
export async function unbookmarkPost(postId, accessToken) {
    const response = await fetch(`${PUBLICHOSTNAME}/bookmark/${postId}`, {
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
    // Log(state)
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