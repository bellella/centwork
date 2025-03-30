import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { roomId: string } }) {
    const messages = await prisma.message.findMany({
        where: { roomId: params.roomId },
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
}

export async function POST(req: NextRequest, { params }: { params: { roomId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    const message = await prisma.message.create({
        data: {
            roomId: params.roomId,
            senderId: session.user.id,
            content,
        },
    });

    return NextResponse.json(message);
}
