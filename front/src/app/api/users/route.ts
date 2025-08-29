import { getAuthTokenServer } from "@/utils/auth-server";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function GET(_request: NextRequest) {
  try {
    const token = await getAuthTokenServer()

    if (!token) {
      return NextResponse.json(
        { message: 'Token de autorização não encontrado' },
        { status: 401 }
      );
    }


    const response = await fetch(`${API_BACKEND_URL}/user`, {
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