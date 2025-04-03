import { useState } from 'react';
import { Product } from '@prisma/client';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function ProductDetail({ product }: { product: Product | null }) {
  const router = useRouter();
  const [noImage, setNoImage] = useState(false);

  if (!product) {
    return null;
  }

  return (
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
  );
}
