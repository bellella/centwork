import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { createProduct } from "@/lib/db/product.db";
import { ProductStatus } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, price, image, category, location, keywords } =
    await req.json();
  const product = await createProduct({
    title,
    description,
    price,
    image,
    category,
    location,
    keywords,
    userId: session.user["id"],
    status: ProductStatus.AVAILABLE,
  });

  return NextResponse.json({ message: "Product created", product });
}
