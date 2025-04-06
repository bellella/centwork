'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useSession } from 'next-auth/react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ProductStatus, MessageRoom } from '@prisma/client';
import { updateProductStatus } from '@/app/_actions/getProduct';
import { ExtendedProduct } from '@/types/extendProduct';
import Chip from '@mui/material/Chip';

export default function ProductDetail({
  product,
  roomInfo,
}: {
  product: ExtendedProduct | null;
  roomInfo: MessageRoom;
}) {
  const router = useRouter();
  const [noImage, setNoImage] = useState(false);
  const { data: session } = useSession();

  if (!product) {
    return null;
  }

  const isReservedByUser = product.reservations.some(
    (reservation) => reservation.userId === roomInfo?.buyerId
  );

  const isSoldByUser = product.transactions.some(
    (transaction) => transaction.userId === roomInfo?.buyerId
  );

  const handleStatusChange = async (event: SelectChangeEvent<string>) => {
    const status = event.target.value as ProductStatus;

    const { success } = await updateProductStatus(product.id, status, roomInfo.buyerId);
    if (success) {
      alert('Product status updated successfully');
      router.refresh();
    } else {
      alert('Failed to update product status');
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={2} justifyContent="space-around">
      <Box
        component="button"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={5}
        sx={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          padding: 0,
          border: 'none',
          marginBottom: 2,
          '&:hover': {
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
          },
        }}
        onClick={() => router.push(`/products/${product.id}`)}
      >
        {product.image && !noImage ? (
          <Image
            src={product.image || ''}
            alt={product.title}
            width={60}
            height={60}
            style={{ borderRadius: '8px' }}
            onError={() => {
              setNoImage(true);
            }}
          />
        ) : (
          <ImageNotSupportedIcon
            sx={{ width: 60, height: 60, borderRadius: '8px', color: 'text.secondary' }}
          />
        )}
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body1">${product.price}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        {product.status === ProductStatus.SOLD && <Chip label="Sold" color="error" />}
        {session?.user?.id === product.userId && product.status !== ProductStatus.SOLD && (
          <>
            <Typography variant="body2">Update product for this user: </Typography>
            <FormControl size="small" sx={{ width: 200 }}>
              <Select
                value={
                  product.status === ProductStatus.AVAILABLE
                    ? ProductStatus.AVAILABLE
                    : isSoldByUser
                      ? ProductStatus.SOLD
                      : isReservedByUser
                        ? ProductStatus.RESERVED
                        : ProductStatus.AVAILABLE
                }
                onChange={handleStatusChange}
              >
                <MenuItem value={ProductStatus.AVAILABLE}>Available</MenuItem>
                <MenuItem value={ProductStatus.RESERVED}>Reserved</MenuItem>
                <MenuItem value={ProductStatus.SOLD}>Sold</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
}
