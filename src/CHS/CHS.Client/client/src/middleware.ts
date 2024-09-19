// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromRequest } from './lib/utils/session';

// Middleware function to handle authentication
export function middleware(request: NextRequest) {
    console.log(`Middleware is running for: ${request.nextUrl.pathname}`);

    const session = getSessionFromRequest(request);

    if (!session) {
        const loginUrl = new URL('/login', request.url);

        // Ensure the redirect parameter has a proper leading slash
        const redirectPath = request.nextUrl.pathname.startsWith('/')
            ? request.nextUrl.pathname
            : `/${request.nextUrl.pathname}`;

        loginUrl.searchParams.set('redirect', redirectPath);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/william/:path*'],
};
