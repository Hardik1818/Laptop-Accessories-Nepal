import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Protect all admin sub-routes (e.g., /admin/dashboard, /admin/orders, etc.)
    // But allow the /admin (login) page itself.
    if (pathname.startsWith('/admin') && pathname !== '/admin') {
        const adminSession = request.cookies.get('admin_session')
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (!adminSession || adminSession.value !== adminPassword) {
            // Redirect to login if no valid session
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    // Optional: If user is already authenticated and tries to visit /admin (login),
    // redirect them to the dashboard.
    if (pathname === '/admin') {
        const adminSession = request.cookies.get('admin_session')
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (adminSession?.value === adminPassword) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
