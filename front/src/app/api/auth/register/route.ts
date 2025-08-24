import { NextResponse, NextRequest } from 'next/server';
import { createUser, login } from '@/services/user.service';
import { TOKEN_KEY } from '@/middleware';
import { TSignUpSchema } from '@/schemas/sign-up-form.schema';

export async function POST(request: NextRequest) {
    try {
        const { email, password, cellnumber, first_name, last_name }: TSignUpSchema = await request.json();

        await createUser({ email, password, cellnumber, first_name, last_name });

        const resp = await login({ email, password });

        const { access_token, expires_in } = resp.data

        const response = NextResponse.json({ success: true });

        response.cookies.set(TOKEN_KEY, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Registration failed:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create user. Please try again.' },
            { status: 401 }
        );
    }
}