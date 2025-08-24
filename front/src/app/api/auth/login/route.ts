import { NextResponse, NextRequest } from 'next/server';
import { TOKEN_KEY } from '@/middleware';
import { ILoginUserDTO } from '@/dto/user.dtos';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Faz a requisição para o backend real
        const response = await fetch(`${API_BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { success: false, error: error.message || 'Falha no login.' },
                { status: response.status }
            );
        }

        const data: ILoginUserDTO = await response.json();
        const { access_token, expires_in } = data.data;

        const res = NextResponse.json({ success: true });
        res.cookies.set(TOKEN_KEY, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in,
            path: '/',
        });

        return res;
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Falha no login. Verifique suas credenciais.' },
            { status: 401 }
        );
    }
}