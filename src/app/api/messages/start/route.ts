import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, sellerId } = await req.json();
    const buyerId = session.user.id;

    // 본인에게 채팅 요청 금지
    if (buyerId === sellerId) {
        return NextResponse.json({ error: "Cannot chat with yourself." }, { status: 400 });
    }

    // 기존 방 있는지 확인
    const existing = await prisma.messageRoom.findFirst({
        where: {
            productId,
            buyerId,
            sellerId,
        },
    });

    if (existing) {
        return NextResponse.json({ roomId: existing.id });
    }

    // 새 방 생성
    const room = await prisma.messageRoom.create({
        data: {
            productId,
            buyerId,
            sellerId,
        },
    });

    return NextResponse.json({ roomId: room.id });
}
