import { NextResponse, NextRequest } from 'next/server';
import { login } from '@/services/auth-user.service'; // Use seu service aqui
import { TOKEN_KEY } from '@/middleware';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();


        const resp = await login({ email, password });
        const { access_token, expires_in } = resp.data

        const response = NextResponse.json({ success: true });
        response.cookies.set(TOKEN_KEY, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in,
            path: '/',
        });
        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Falha no login. Verifique suas credenciais.' },
            { status: 401 }
        );
    }
}