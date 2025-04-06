import { getProductById } from '@/lib/db/product.db';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import ChatStartButton from '@/app/components/product/ChatStartButton';
import Link from 'next/link';
import { ProductStatus } from '@prisma/client';
import Chip from '@mui/material/Chip';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  const session = await getServerSession(authOptions);

  if (!product) return notFound();

  const isOwner = session?.user?.id === product.userId;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        {product.title}{' '}
        {product.status === ProductStatus.SOLD && <Chip label="Sold" color="error" size="small" />}
      </h1>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      {product.image && <img src={product.image} alt={product.title} style={{ width: 300 }} />}
      <p>
        <strong>Seller:</strong>{' '}
        <Link href={`/seller/${product.user?.id}`}>
          {product.user?.name}
          {session && isOwner && <span style={{ color: 'green' }}> (You)</span>}
        </Link>
      </p>

      {/* {session && !isOwner && (
                <>
                    <form action="/api/reservations/create" method="POST">
                        <input type="hidden" name="productId" value={product.id}/>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isReserved}
                            sx={{mt: 2}}
                        >
                            {isReserved ? "Already Reserved" : "Reserve"}
                        </Button>
                    </form>
                    </>
                    )}
                    
                    {session && isOwner && (
                        <p style={{marginTop: "1rem"}}>This is your product.</p>
                        )} */}

      {product.status === ProductStatus.AVAILABLE && (
        <ChatStartButton productId={product.id} sellerId={product.userId} />
      )}

      {!session && product.status === ProductStatus.AVAILABLE && (
        <p style={{ marginTop: '1rem' }}>You must log in to chat with the seller.</p>
      )}
    </div>
  );
}
