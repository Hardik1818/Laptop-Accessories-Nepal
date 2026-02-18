import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Protect all admin sub-routes (e.g., /adminlogin/dashboard, /adminlogin/orders, etc.)
    // But allow the /adminlogin (login) page itself.
    if (pathname.startsWith('/adminlogin') && pathname !== '/adminlogin') {
        const adminSession = request.cookies.get('admin_session')
        const adminPassword = (process.env.ADMIN_PASSWORD || 'admin123').trim()

        if (!adminSession || adminSession.value !== adminPassword) {
            return NextResponse.redirect(new URL('/adminlogin', request.url))
        }
    }

    // Optional: If user is already authenticated and tries to visit /adminlogin (login),
    // redirect them to the dashboard.
    if (pathname === '/adminlogin') {
        const adminSession = request.cookies.get('admin_session')
        const adminPassword = (process.env.ADMIN_PASSWORD || 'admin123').trim()

        if (adminSession?.value === adminPassword) {
            return NextResponse.redirect(new URL('/adminlogin/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/adminlogin/:path*'],
}
