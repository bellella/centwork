import { ProductWithRating } from '@/types/extendProduct';
import { Box, Rating, Avatar, CardContent, Typography, Stack } from '@mui/material';
import BlankCard from '../shared/BlankCard';

export default function ProductCardWithRating({ product }: { product: ProductWithRating }) {
  console.log(product);
  return (
    <Box>
      <BlankCard>
        <Avatar src={product.image ?? ''} variant="square" sx={{ height: 250, width: '100%' }} />

        <CardContent sx={{ p: 3, pt: 2 }}>
          <Typography variant="h6">{product.title}</Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h6">${product.price}</Typography>
            </Stack>
          </Stack>

          <Stack direction="column" mt={1} gap={1}>
            <Stack direction="row" alignItems="center">
              <Rating value={product.transactions[0].rating ?? 0} readOnly />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2">
                {product.transactions[0].review || 'No review'}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  );
}
