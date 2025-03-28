import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { updateProduct } from "@/lib/db/product.db";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.["id"])
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title, description, price, image } = await req.json();

  const product = await updateProduct(id, { title, description, price, image });

  return NextResponse.json({ message: "Product updated", product });
}
