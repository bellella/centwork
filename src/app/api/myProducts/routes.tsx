// app/api/products/create/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { getProductByUserId } from "@/lib/db/product.db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await getProductByUserId(session.user["id"]);
  return NextResponse.json({ message: "Products fetched", products });
}
