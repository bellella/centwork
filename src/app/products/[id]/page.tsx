import { getProductById } from "@/lib/db/product.db";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div style={{ padding: "2rem" }}>Product not found.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
}
