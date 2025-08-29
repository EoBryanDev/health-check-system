import { NextResponse, NextRequest } from 'next/server';
import { IServiceInputDTO } from '@/interfaces/IConfigurations';
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

		const jobServiceData: IServiceInputDTO = await request.json();

		// Faz a requisição diretamente para o backend real, com o token
		const response = await fetch(`${API_BACKEND_URL}/jobs/service`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jobServiceData),
		});

		const data = await response.json();
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Failed to add service to job.' },
			{ status: 500 }
		);
	}
}