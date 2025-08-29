
import { NextResponse, NextRequest } from 'next/server';
import { getAuthTokenServer } from '@/utils/auth-server';

const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;

export async function GET(request: NextRequest, context: any) {
  try {
    let id;
    if (context.params) {
      if (typeof context.params.then === 'function') {

        const resolvedParams = await context.params;
        id = resolvedParams.id;
      } else {

        id = context.params.id;
      }
    }


    if (!id) {
      return NextResponse.json(
        { error: 'Service ID é obrigatório' },
        { status: 400 }
      );
    }

    const token = await getAuthTokenServer();
    if (!token) {

      return NextResponse.json(
        { error: 'Token de autorização não encontrado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const offset = searchParams.get('offset') || '0';
    const limit = searchParams.get('limit') || '10';

    const offsetNum = parseInt(offset, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(offsetNum) || isNaN(limitNum) || offsetNum < 0 || limitNum < 1) {
      return NextResponse.json(
        { error: 'Offset deve ser >= 0 e limit deve ser >= 1' },
        { status: 400 }
      );
    }

    const backendUrl = `${API_BACKEND_URL}/services/${id}/service-logs?offset=${offsetNum}&limit=${limitNum}`;


    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });



    if (!response.ok) {
      const errorText = await response.text();



      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }

      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();


    return NextResponse.json({
      data: data.data,
      offset: data.offset || offsetNum,
      limit: data.limit || limitNum
    }, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      {
        error: 'Failed to retrieve service logs',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}