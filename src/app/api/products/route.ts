// app/api/products/create/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/db/product.db";

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.["id"])
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//
//   const { title, description, price, image } = await req.json();
//   const product = await createProduct({
//     title,
//     description,
//     price,
//     image,
//     userId: session.user["id"],
//   });
//
//   return NextResponse.json({ message: "Product created", product });
// }

export async function GET(req: Request) {
  const { search } = new URL(req.url);

  let query = "";
  if (search.includes("?")) {
    query = search.split("?")[1];
  } else {
    query = search;
  }

  const params = new URLSearchParams(query);
  const queryObject = Object.fromEntries(params.entries());

  const products = await getProducts(queryObject);

  return NextResponse.json({ products });
}
