import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getTransactionHistory } from '@/app/_actions/transaction';
import { Grid } from '@mui/material';
import HistoryCard from '@/app/components/product/HistoryCard';

export default async function TransactionHistory() {
  const transactions = await getTransactionHistory();

  return (
    <Box>
      <Typography variant="h1" mb={4}>
        Transaction History
      </Typography>
      <Grid container spacing={3}>
        {transactions.map((transaction) => (
          <Grid item xs={12} md={6} lg={4} key={transaction.id}>
            <HistoryCard transaction={transaction} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
