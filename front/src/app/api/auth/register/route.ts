import { NextResponse, NextRequest } from 'next/server';
import { TSignUpSchema } from '@/schemas/sign-up-form.schema';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function POST(request: NextRequest) {
    try {
        const userData: TSignUpSchema = await request.json();

        // Faz a requisição para o backend real
        const response = await fetch(`${API_BACKEND_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { success: false, error: error.message || 'Falha ao criar usuário' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Falha ao criar usuário.' },
            { status: 500 }
        );
    }
}