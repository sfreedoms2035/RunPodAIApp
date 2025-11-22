import { NextResponse } from 'next/server';
import { sshManager } from '@/lib/ssh';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { command } = body;

        if (!command) {
            return NextResponse.json({ error: 'Missing command' }, { status: 400 });
        }

        const output = await sshManager.exec(command);

        return NextResponse.json({ success: true, output });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
