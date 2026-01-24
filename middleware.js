import {NextResponse} from "next/server";
import {jwtVerify} from 'jose';

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key-replace-me-in-production';
const key = new TextEncoder().encode(secretKey);

async function decrypt(input) {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

// export const _config = {
//     matcher: ["/questions/:path*", '/dashboard/:path*']
// }

const protectedRoute = ['/questions', '/dashboard', '/dashboard/me', '/dashboard/calendar', '/dashboard/logs', '/dashboard/community']
const publicRoutes = ['/', '/auth/register', '/auth/signIn']

export async function middleware(request) {
    const encryptedToken = request.cookies.get('access_token')?.value
    let token = null;

    if (encryptedToken) {
        try {
            token = await decrypt(encryptedToken);
        } catch (e) {
            // console.error("middleware decryption failed", e);
        }
    }

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // move unregistered users to their public pages
    if (
        isPublicRoute &&
        token &&
        request.cookies.get('last_login') === null &&
        request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/questions', request.nextUrl))
    }
    // move users away from the unnecessary public routes
    if (
        isPublicRoute &&
        token &&
        !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next()


}

