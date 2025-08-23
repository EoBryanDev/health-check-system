import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server'

export const TOKEN_KEY = 'token'
const publicRoutes: { path: string | RegExp; whenAuthenticated: 'redirect' | 'next' }[] = [
    { path: '/sign-in', whenAuthenticated: 'redirect' },
    { path: '/', whenAuthenticated: 'next' },
    { path: '/dashboard', whenAuthenticated: 'next' }


] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const publicRoute = publicRoutes.find(route => {
        if (typeof route.path === 'string') {
            return route.path === path;
        } else {
            return route.path.test(path); // Verifica se a rota corresponde ao padrão dinâmico
        }
    })

    const authToken = request.cookies.get('token')

    if (!authToken && publicRoute) {
        return NextResponse.next()
    }

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

        return NextResponse.redirect(redirectUrl)

    }
    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/'

        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && !publicRoute) {
        // validar se o jwt está expirado
        // se sim, remover o token
        return NextResponse.next()
    }
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}