// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();

    // Remove o cookie com o nome 'token'
    cookieStore.delete('token');

    // Retorna uma resposta de sucesso
    return NextResponse.json({ success: true, message: 'Logout successful' });
}