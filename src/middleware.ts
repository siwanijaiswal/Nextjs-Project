import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//if somebody have token, then they must not able to get on login, 
// signup page, if not logged in or donot have token then must not able to see profile page
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup'
    ],
}