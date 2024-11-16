import { NextResponse } from "next/server";


// export const config = {
//     matcher: ["/questions/:path*", '/dashboard/:path*']
// }

const protectedRoute = ['/questions', '/dashboard', '/dashboard/me', '/dashboard/calendar', '/dashboard/logs', '/dashboard/community']
const publicRoutes = ['/', '/auth/register', '/auth/signIn']

export function middleware(request) {
    const token = request.cookies.get('access_token')
    
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (
        isPublicRoute &&
        token &&
        request.cookies.get('last_login') === null &&
        request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/questions', request.nextUrl))
    }

    if (
        isPublicRoute &&
        token &&
        !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next()
    

}

