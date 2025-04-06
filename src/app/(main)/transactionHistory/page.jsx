import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTransactionHistory } from '@/app/_actions/transaction';
import ProductCard from '@/app/components/product/ProductCard';
import { Grid } from '@mui/material';

export default async function TransactionHistory() {
  const transactions = await getTransactionHistory();

  return (
    <Box>
      <Typography variant="h1" mb={4}>
        Transaction History
      </Typography>
      <Grid container spacing={3}>
        {transactions.map((transaction) => (
          <Grid item xs={12} md={4} lg={3} key={transaction.id}>
            <ProductCard
              product={transaction.product}
              isMyProducts={false}
              transactionDate={transaction.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
