import { NextResponse } from 'next/server';
import { sshManager } from '@/lib/ssh';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { host, port, username, password } = body;

        if (!host || !username) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await sshManager.connect({ host, port, username, password });

        return NextResponse.json({ success: true, message: 'Connected successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
