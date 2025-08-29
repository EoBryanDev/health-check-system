import { getAuthTokenServer } from '@/utils/auth-server';
import { NextResponse, NextRequest } from 'next/server';


const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function PUT(request: NextRequest, context: any) {
    try {
        const token = await getAuthTokenServer();

        if (!token) {
            return NextResponse.json(
                { message: 'Token de autorização não encontrado' },
                { status: 401 }
            );
        }

        let id;
        if (context.params) {
            if (typeof context.params.then === 'function') {
                const resolvedParams = await context.params;
                id = resolvedParams.id;
            } else {
                id = context.params.id;
            }
        }


        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('mode') || 'single';


        let apiUrl;
        if (mode === 'all') {
            apiUrl = `${API_BACKEND_URL}/jobs/run/all?mode=${mode}`;
        } else if (mode === 'group') {
            apiUrl = `${API_BACKEND_URL}/jobs/run/${id}?mode=${mode}`;
        } else {

            apiUrl = `${API_BACKEND_URL}/jobs/run/${id}?mode=single`;
        }

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });


        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: `Backend returned status ${response.status} and no valid JSON.`
            }));

            const errorMessage = errorData.error || `Backend returned status ${response.status}`;
            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: response.status }
            );
        }


        if (response.status === 204) {
            return NextResponse.json(
                { success: true, message: "Job executed successfully" },
                { status: 200 }
            );
        }


        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        console.error("Error in run-job API route:", error);

        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}