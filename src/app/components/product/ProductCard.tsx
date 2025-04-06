import { Product } from '@prisma/client';
import Link from 'next/link';
import { Avatar, CardContent, Rating, Stack, Typography } from '@mui/material';
import BlankCard from '../shared/BlankCard';
import moment from 'moment';

export default function ProductCard({
  product,
  isMyProducts,
  transactionDate,
}: {
  product: Product;
  isMyProducts: boolean;
  transactionDate: Date;
}) {
  return (
    <Link
      href={isMyProducts ? `/myProducts/${product.id}` : `/products/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <BlankCard>
        <Avatar src={product.image ?? ''} variant="square" sx={{ height: 250, width: '100%' }} />

        <CardContent sx={{ p: 3, pt: 2 }}>
          <Typography variant="h6">{product.title}</Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h6">${product.price}</Typography>
            </Stack>
            {/* <Rating
              name="read-only"
              size="small"
              value={product.rating ?? 0}
              readOnly
            /> */}
          </Stack>

          {transactionDate && (
            <Typography variant="body2" mt={1}>
              {moment(transactionDate).format('YYYY-MM-DD')}
            </Typography>
          )}
        </CardContent>
      </BlankCard>
    </Link>
  );
}
