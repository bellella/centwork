import { NextResponse } from 'next/server';
import { getMessageRooms } from "@/lib/db/message.db";

export async function GET() {
    const data = await getMessageRooms();
    console.log(data,'....')
    return NextResponse.json({ data })
}