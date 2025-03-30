import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/lib/db/product.db";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    id,
    title,
    description,
    price,
    image,
    status,
    category,
    location,
    keywords,
  } = await req.json();

  const product = await updateProduct(id, {
    title,
    description,
    price,
    image,
    status,
    category,
    location,
    keywords,
  });

  return NextResponse.json({ message: "Product updated", product });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();

  const product = await deleteProduct(id);

  return NextResponse.json({ message: "Product deleted", product });
}