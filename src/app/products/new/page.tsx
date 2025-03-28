"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Chip,
} from "@mui/material";
import { ProductCategory } from "@prisma/client";

export default function NewProductPage() {
  const [keywordInput, setKeywordInput] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: ProductCategory.OTHER,
    location: "",
    keywords: [],
  } as Product);

  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/products/create", {
      method: "POST",
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product created successfully");
      router.push("/");
    } else {
      alert(data.error || "Failed to create product");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
      py={4}
    >
      <Typography variant="h4" gutterBottom>
        New Product
      </Typography>
      <TextField
        label="Title"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        fullWidth
        margin="normal"
        multiline
        required
      />
      <TextField
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: parseInt(e.target.value) })
        }
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Category"
        value={product.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value as ProductCategory,
          })
        }
        fullWidth
        margin="normal"
        required
      >
        {Object.values(ProductCategory).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Location"
        value={product.location}
        onChange={(e) => setProduct({ ...product, location: e.target.value })}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Keywords"
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setProduct({
              ...product,
              keywords: [...product.keywords, keywordInput],
            });
            setKeywordInput("");
          }
        }}
        fullWidth
        placeholder="Press Enter to add keyword"
        sx={{ mt: 2, mb: 2 }}
      />
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="start"
        width="100%"
        mt={product.keywords.length > 0 ? 1 : 0}
        mb={product.keywords.length > 0 ? 2 : 0}
      >
        {product.keywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            onDelete={() =>
              setProduct({
                ...product,
                keywords: product.keywords.filter((k) => k !== keyword),
              })
            }
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

type Product = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  location: string;
  keywords: string[];
};
