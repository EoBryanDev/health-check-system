import { getAuthTokenServer } from "@/utils/auth-server";
import { NextRequest, NextResponse } from "next/server";
const API_BACKEND_URL = process.env.NEXT_PUBLIC_WS;
export async function DELETE(
  _request: NextRequest, context: any
) {
  try {
    const token = await getAuthTokenServer();

    if (!token) {
      return NextResponse.json({ message: 'Token de autorização não encontrado' }, { status: 401 });
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
    const response = await fetch(`${API_BACKEND_URL}/jobs/${id}`, {
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