import { getProductById } from "@/lib/db/product.db";
import EditProductPage from "./_components/EditProductPage";

export default async function MyProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <EditProductPage productDetails={product} />;
}
