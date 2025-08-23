import { NextResponse, NextRequest } from 'next/server';
import { login } from '@/services/auth-user.service'; // Use seu service aqui
import { TOKEN_KEY } from '@/middleware';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();


        const { access_token, expires_in } = (await login({ email, password })).data;
        console.log({ access_token, expires_in });

        const response = NextResponse.json({ success: true });
        response.cookies.set(TOKEN_KEY, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in,
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json(
            { success: false, error: 'Falha no login. Verifique suas credenciais.' },
            { status: 401 }
        );
    }
}