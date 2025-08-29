import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const TOKEN_KEY = 'token';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const publicRoutes: { path: string | RegExp; whenAuthenticated: 'redirect' | 'next' }[] = [
    { path: '/', whenAuthenticated: 'redirect' },
    { path: '/sign-up', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/';
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = '/dashboard';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const authToken = request.cookies.get(TOKEN_KEY);

    const publicRoute = publicRoutes.find(route => {
        if (typeof route.path === 'string') {
            return route.path === path;
        } else {
            return route.path.test(path);
        }
    });

    let isValidToken = false;
    let tokenExpired = false;

    if (authToken) {
        try {
            await jwtVerify(authToken.value, JWT_SECRET);
            isValidToken = true;
        } catch (error: any) {
            console.error('Token validation failed:', error);


            if (error.code === 'ERR_JWT_EXPIRED' || error.message?.includes('expired')) {
                tokenExpired = true;
                console.log('Token expired, will redirect to login');
            }
        }
    }
    if ((!isValidToken || tokenExpired) && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        const response = NextResponse.redirect(redirectUrl);

        if (authToken) {
            response.cookies.delete(TOKEN_KEY);
            console.log('Removed expired/invalid token from cookies');
        }

        return response;
    }
    if (isValidToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};