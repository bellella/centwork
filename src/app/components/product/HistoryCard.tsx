'use client';

import { CardContent, Stack, Typography, Rating, Box, TextField, Button } from '@mui/material';
import BlankCard from '../shared/BlankCard';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { TransactionWithProduct } from '@/types/extendProduct';
import { useState } from 'react';
import { updateTransactionRating } from '@/app/_actions/getProduct';
import { useRouter } from 'next/navigation';

export default function HistoryCard({ transaction }: { transaction: TransactionWithProduct }) {
  const [rating, setRating] = useState<number | null>(transaction.rating ?? 0);
  const [review, setReview] = useState(transaction.review ?? '');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!rating || !review) {
      alert('Please enter a rating and review');
      return;
    }

    try {
      const updatedTransaction = await updateTransactionRating(transaction.id, rating, review);
      router.refresh();
    } catch (error) {
      alert('Failed to update rating and review');
    }
  };

  return (
    <BlankCard>
      <Avatar
        src={transaction.product.image ?? ''}
        variant="square"
        sx={{ height: 250, width: '100%' }}
      />

      <CardContent sx={{ p: 3, pt: 2 }}>
        <Typography variant="h6">{transaction.product.title}</Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">${transaction.product.price}</Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" mt={1}>
          Sold on: {moment(transaction.createdAt).format('YYYY-MM-DD')}
        </Typography>

        {!transaction.rating && !transaction.review ? (
          <Box mt={2} display="flex" flexDirection="column" gap={3}>
            <Rating
              name="read-only"
              size="small"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
            <TextField
              fullWidth
              label="Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              multiline
              rows={3}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        ) : (
          <Box mt={2} display="flex" flexDirection="column" gap={3}>
            <Rating name="read-only" size="small" value={transaction.rating} readOnly />
            <TextField
              fullWidth
              label="Review"
              value={transaction.review}
              multiline
              rows={3}
              disabled
            />
          </Box>
        )}
      </CardContent>
    </BlankCard>
  );
}
