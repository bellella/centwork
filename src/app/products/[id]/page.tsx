import { getProductById } from "@/lib/db/product.db";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Button } from "@mui/material";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    const session = await getServerSession(authOptions);

    if (!product) return notFound();

    const isOwner = session?.user?.id === product.userId;
    const isReserved = product.reservations?.length > 0;
    const reservedByMe = product.reservations?.some(res => res.userId === session?.user?.id);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            {product.image && <img src={product.image} alt={product.title} style={{ width: 300 }} />}
            <p><strong>Seller:</strong> {product.user?.name}</p>

            {session && !isOwner && (
                <form action="/api/reservations/create" method="POST">
                    <input type="hidden" name="productId" value={product.id} />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isReserved}
                        sx={{ mt: 2 }}
                    >
                        {isReserved ? "Already Reserved" : "Reserve"}
                    </Button>
                </form>
            )}

            {session && isOwner && (
                <p style={{ marginTop: "1rem" }}>This is your product.</p>
            )}

            {!session && (
                <p style={{ marginTop: "1rem" }}>You must log in to reserve this product.</p>
            )}
        </div>
    );
}
