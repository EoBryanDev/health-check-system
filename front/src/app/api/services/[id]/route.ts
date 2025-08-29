// app/api/services/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuthTokenServer } from '@/utils/auth-server';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const token = await getAuthTokenServer()

        if (!token) {
            return NextResponse.json(
                { message: 'Token de autorização não encontrado' },
                { status: 401 }
            );
        }

        // Faz a requisição para o backend real com o token
        const response = await fetch(`${API_BACKEND_URL}/services/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to retrieve service details.' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = await getAuthTokenServer();

        if (!token) {
            return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
        }

        const { id } = params;

        const response = await fetch(`${API_BACKEND_URL}/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(error, { status: response.status });
        }

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete service.' }, { status: 500 });
    }
}