import { NextResponse } from "next/server";


export const config = {
    // match: ['/', '/onboarding', '/register', '/signIn']
    matcher: ["/questions"]
}

export function middleware(request) {
    const token = request.cookies.get('access_token')

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

