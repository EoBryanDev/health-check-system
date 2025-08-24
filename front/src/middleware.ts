import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';

export const TOKEN_KEY = 'token';
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

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
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