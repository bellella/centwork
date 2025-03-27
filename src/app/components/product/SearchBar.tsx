"use client";

import { InputBase, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch}>
      <InputBase
        placeholder="Search products"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ bgcolor: "white", px: 2, borderRadius: 1 }}
      />
    </Box>
  );
}
