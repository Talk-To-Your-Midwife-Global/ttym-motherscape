import { NextResponse } from "next/server";


export const config = {
    // match: ['/', '/onboarding', '/register', '/signIn']
    matcher: ["/questions", '/dashboard']
}

export function middleware(request) {
    const token = request.cookies.get('access_token')

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // if user has access token is trying to access onboarding, they should be redirected
    // if (token && request.nextUrl.pathname.startsWith('/onboarding')) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url))
    // } 
    
    return NextResponse.next()
    

}

