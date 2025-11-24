import {cookies} from "next/headers";

/**
 * Gets all cookies passed.
 * Pass in an array of cookies wanted and get an object containing all of them
 * @param requestedCookies[]
 * @returns {Promise<{}>}
 * @example
 * const {last_login} = await getLocalCookies(['last_login']);
 */
export const getLocalCookies = async (requestedCookies = []) => {
    const cookieStore = await cookies();
    let requestedCookiesMap = {}

    for (const req of requestedCookies) {
        requestedCookiesMap[req] = cookieStore.get(req)?.value;
    }

    return requestedCookiesMap;
}
