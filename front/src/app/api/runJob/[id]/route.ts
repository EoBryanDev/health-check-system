import { TJobExecutionMode } from '@/interfaces/IJob';
import { runJob } from '@/services/job.service';
import { getAuthTokenServer } from '@/utils/auth-server';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const token = await getAuthTokenServer();
        if (!token) {
            return NextResponse.json(
                { message: 'Token de autorização não encontrado' },
                { status: 401 }
            );
        }
        const url = new URL(request.url);
        const mode = url.searchParams.get('mode') as TJobExecutionMode;
        const id = params.id;


        await runJob({ id, mode });

        return NextResponse.json({ success: true, message: 'Job execution request received.' }, { status: 202 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to run job.' },
            { status: 500 }
        );
    }
}