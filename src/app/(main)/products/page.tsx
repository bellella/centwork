'use client';

import ProductList from '../../components/product/ProductList';
import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import { Box } from '@mui/material';
import Filter from './_components/Filter';
import { ProductQuery } from '@/types/extendProduct';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<ProductQuery>({
    keyword: '',
    category: 'ALL',
    location: 'ALL',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();

      if (query.keyword) {
        params.append('keyword', query.keyword);
      }

      if (query.category !== 'ALL') {
        params.append('category', query.category);
      }

      if (query.location !== 'ALL') {
        params.append('location', query.location);
      }

      const apiQuery = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;

      const products = await fetch(apiQuery);

      const productsData = await products.json();

      setProducts(productsData?.products || []);
    };
    fetchProducts();
  }, [query]);

  const handleSearch = (keyword: string) => {
    setQuery({ ...query, keyword });
  };

  return (
    <Box display="flex" gap={2}>
      <Filter onSearch={handleSearch} query={query} setQuery={setQuery} />
      <Box flex={1}>
        <ProductList products={products} isMyProducts={false} />
      </Box>
    </Box>
  );
}
