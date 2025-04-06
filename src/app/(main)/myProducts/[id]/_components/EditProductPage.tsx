'use client';

import { TextField, Button, Box, Typography, MenuItem, Chip } from '@mui/material';
import Image from 'next/image';
import { ProductCategory, ProductStatus, Location } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithUserAndReservations } from '@/types/extendProduct';

export default function EditProductPage({
  productDetails,
}: {
  productDetails: ProductWithUserAndReservations;
}) {
  const router = useRouter();
  const [keywordInput, setKeywordInput] = useState('');
  const [product, setProduct] = useState<ProductWithUserAndReservations>(productDetails);

  const handleChangeImage = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          setProduct({ ...product, image: uploadData.fileUrl, imageName: file.name });
        } else {
          alert('Failed to upload image');
        }
      }
    };
    fileInput.click();
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/myProducts/edit`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Product updated');
      router.push('/myProducts');
    } else {
      alert(data.error || 'Failed to update product');
    }
  };

  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      handleDelete();
    }
  };

  const isSold = product.status === ProductStatus.SOLD;

  const handleDelete = async () => {
    const res = await fetch(`/api/myProducts/edit`, {
      method: 'DELETE',
      body: JSON.stringify({ id: product.id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Product deleted');
      router.push('/myProducts');
    } else {
      alert(data.error || 'Failed to delete product');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
      {isSold ? (
        <Typography variant="h4" gutterBottom color="error">
          Product Sold
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>
      )}
      <Box height={300} width={'100%'} position={'relative'}>
        <Image
          src={product.image || ''}
          alt={product.title || 'Product image'}
          fill
          objectFit="contain"
          priority={false}
        />
      </Box>
      <Button variant="contained" onClick={handleChangeImage} disabled={isSold}>
        Change Image
      </Button>
      <TextField
        label="Title"
        value={product?.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        fullWidth
        margin="normal"
        disabled={isSold}
      />
      <TextField
        label="Description"
        value={product?.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        fullWidth
        margin="normal"
        disabled={isSold}
      />
      <TextField
        label="Price"
        value={product?.price}
        onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
        fullWidth
        margin="normal"
        disabled={isSold}
      />
      <TextField
        select
        label="Status"
        value={product?.status}
        onChange={(e) => setProduct({ ...product, status: e.target.value as ProductStatus })}
        fullWidth
        margin="normal"
        disabled={isSold}
      >
        {Object.values(ProductStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Category"
        value={product?.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value as ProductCategory,
          })
        }
        fullWidth
        margin="normal"
        disabled={isSold}
      >
        {Object.values(ProductCategory).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Location"
        value={product?.location}
        onChange={(e) => setProduct({ ...product, location: e.target.value as Location })}
        fullWidth
        margin="normal"
        disabled={isSold}
      >
        {Object.values(Location).map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Keywords"
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setProduct({
              ...product,
              keywords: [...product.keywords, keywordInput],
            });
            setKeywordInput('');
          }
        }}
        fullWidth
        margin="normal"
        placeholder="Press Enter to add keyword"
        sx={{ mt: 2, mb: 2 }}
        disabled={isSold}
      />
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="start" width="100%">
        {product.keywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            disabled={isSold}
            onDelete={() =>
              setProduct({
                ...product,
                keywords: product.keywords.filter((k) => k !== keyword),
              })
            }
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%" gap={4}>
        <Button
          variant="contained"
          onClick={confirmDelete}
          sx={{ mt: 2 }}
          color="error"
          disabled={isSold}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }} disabled={isSold}>
          Update
        </Button>
      </Box>
    </Box>
  );
}
