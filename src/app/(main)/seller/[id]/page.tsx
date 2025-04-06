import { getSellerInfo } from '@/app/_actions/user';
import ProductCard from '@/app/components/product/ProductCard';
import { Box, Grid, Typography } from '@mui/material';
import { ProductStatus, Product } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import ProductCardWithRating from '@/app/components/product/ProductCardWithRating';
import { ProductWithRating } from '@/types/extendProduct';

export default async function SellerPage({ params }: { params: { id: string } }) {
  const id = params.id as string;
  const session = await getServerSession(authOptions);

  const sellerInfo = await getSellerInfo(id);

  const listProducts =
    sellerInfo?.products.filter((product) => product.status === ProductStatus.AVAILABLE) || [];

  const historyProducts =
    sellerInfo?.products.filter((product) => product.status === ProductStatus.SOLD) || [];

  const isMyProducts = sellerInfo?.id === session?.user?.id;

  return (
    <Box display="flex" flexDirection="column" gap={4} p={2}>
      <Typography variant="h1" color="primary">
        Seller: {sellerInfo?.name}
      </Typography>

      <Box mt={2}>
        <Typography variant="h3" mb={2}>
          Listing Products
        </Typography>
        <Grid container spacing={2}>
          {listProducts.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <ProductCard
                product={
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    status: product.status,
                  } as Product
                }
                isMyProducts={isMyProducts}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={2}>
        <Typography variant="h3" mb={2}>
          History Products
        </Typography>
        <Grid container spacing={2}>
          {historyProducts.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <ProductCardWithRating product={product as ProductWithRating} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
