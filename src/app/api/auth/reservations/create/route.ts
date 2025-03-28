// app/api/reservations/create/route.ts
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {NextResponse} from "next/server";
import {createReservation} from "@/lib/db/reservation.db";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.['id']) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    const reservation = await createReservation(productId, session.user['id']);

    return NextResponse.json({ message: "Reserved", reservation });
}
