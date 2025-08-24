import { NextResponse, NextRequest } from 'next/server';
import { IJobInputDTO } from '@/interfaces/IConfigurations';
import { getAuthTokenServer } from '@/utils/auth-server';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function GET(_request: NextRequest) {
    try {
        const token = await getAuthTokenServer()

        if (!token) {
            return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
        }

        const response = await fetch(`${API_BACKEND_URL}/jobs`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(await response.json(), { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to retrieve jobs.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = await getAuthTokenServer()

        if (!token) {
            return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
        }

        const jobData: IJobInputDTO = await request.json();
        const response = await fetch(`${API_BACKEND_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create job.' }, { status: 500 });
    }
}