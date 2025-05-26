import {cookies} from "next/headers";

export const getLocalCookies = async (requestedCookies = []) => {
    const cookieStore = await cookies();
    let requestedCookiesMap = {}

    for (const req of requestedCookies) {
        requestedCookiesMap[req] = cookieStore.get(req)?.value;
    }

    return requestedCookiesMap;
}
