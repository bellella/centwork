import { getProducts } from "@/lib/db/product.db";
import ProductList from "../components/product/ProductList";

export default async function ProductPage() {
  const products = await getProducts();

  return <ProductList products={products} />;
}
