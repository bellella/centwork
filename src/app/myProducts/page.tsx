import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getProductByUserId } from "@/lib/db/product.db";
import ProductList from "@/app/components/product/ProductList";

export default async function MyProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const products = await getProductByUserId(session.user.id);

  return <ProductList products={products} isMyProducts={true} />;
}
