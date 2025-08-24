// app/api/groups/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { IGroupInputDTO } from '@/interfaces/IConfigurations';
import { getAuthTokenServer } from '@/utils/auth-server';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function GET(_request: NextRequest) {
  try {
    const token = await getAuthTokenServer()


    if (!token) {
      return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
    }

    const response = await fetch(`${API_BACKEND_URL}/groups`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve groups.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthTokenServer()

    if (!token) {
      return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
    }

    const groupData: IGroupInputDTO = await request.json();
    const response = await fetch(`${API_BACKEND_URL}/groups`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create group.' },
      { status: 500 }
    );
  }
}