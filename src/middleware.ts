import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// checking user role
function getUserRole(token: string): string | null {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload.role || null;
    } catch {
        return null;
    }
}
// main middle 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const publicPaths = path === "/" || path === "/checkout";

    if (!token && !publicPaths) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (token && path.startsWith("/dashboard")) {
        const role = getUserRole(token);
        if (role !== "admin") {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/order-complete/:path*',
        '/payment/:path*',
        '/dashboard/:path*'
    ]
};
