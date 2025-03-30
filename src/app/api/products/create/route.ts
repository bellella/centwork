import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { createProduct } from "@/lib/db/product.db";
import {Product, ProductStatus} from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, price, image, imageName, category, location, keywords }: Product =
    await req.json();
  const product = await createProduct({
    title,
    description,
    price,
    image,
    imageName,
    category,
    location,
    keywords,
    user: { connect: { id: session.user.id } },
    status: ProductStatus.AVAILABLE,
  });

  return NextResponse.json({ message: "Product created", product });
}
