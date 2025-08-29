import { cookies } from 'next/headers';

const TOKEN_KEY = 'token';

export const getAuthTokenServer = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_KEY)?.value;
};