import { getProductByUserId } from "@/lib/db/product.db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductList from "../components/product/ProductList";

export default async function myProducts() {
  const session = await getServerSession(authOptions);
  const products = await getProductByUserId(session?.user?.["id"]);

  return <ProductList products={products} isMyProducts={true} />;
}
