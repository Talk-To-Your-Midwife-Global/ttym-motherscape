import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import posthog from "posthog-js";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"]
  });
  return payload;
}

const protectedRoute = ["/questions", "/dashboard", "/dashboard/me", "/dashboard/calendar", "/dashboard/logs", "/dashboard/community"];
const publicRoutes = ["/", "/auth/register", "/auth/signIn"];

export async function middleware(request) {
  const encryptedToken = request.cookies.get("refresh_token")?.value;
  let token = null;

  if (encryptedToken) {
    try {
      token = await decrypt(encryptedToken);
    } catch (e) {
      posthog.captureException(`middleware decryption failed ${e}`);
    }
  }

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoute.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // move unregistered users to their public pages
  if (
    isPublicRoute &&
    token &&
    request.cookies.get("menstrual_profile_created") === null &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/questions", request.nextUrl));
  }
  // move users away from the unnecessary public routes
  if (
    isPublicRoute &&
    token &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return NextResponse.next();


}

