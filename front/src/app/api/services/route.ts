import { NextResponse, NextRequest } from 'next/server';
import { IServiceInputDTO } from '@/interfaces/IService';
import { getAuthTokenServer } from '@/utils/auth-server';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function POST(request: NextRequest) {
    try {
        const token = await getAuthTokenServer()

        if (!token) {
            return NextResponse.json(
                { message: 'Token de autorização não encontrado' },
                { status: 401 }
            );
        }

        const serviceData: IServiceInputDTO = await request.json();

        // Faz a requisição para o backend real com o token
        const response = await fetch(`${API_BACKEND_URL}/services`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create service.' },
            { status: 500 }
        );
    }
}

export async function GET(_request: NextRequest) {
    try {
        const token = await getAuthTokenServer()

        if (!token) {
            return NextResponse.json(
                { message: 'Token de autorização não encontrado' },
                { status: 401 }
            );
        }

        // Faz a requisição para o backend real com o token
        const response = await fetch(`${API_BACKEND_URL}/services`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });



        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to retrieve services.' },
            { status: 500 }
        );
    }
}