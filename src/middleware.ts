import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const publicPaths = path === "/" || path === "/checkout";

    // if (publicPaths && token) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
    if (!token && !publicPaths) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}
export const config = {
    matcher: [
        '/profile',
        '/order-complete/:path*',
        '/payment/:path*'
    ]
}