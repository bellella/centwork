"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function NewProductPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        const res = await fetch("/api/products/create", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                price: parseInt(price),
                image,
            }),
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
        <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
            <Typography variant="h4" gutterBottom>New Product</Typography>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" multiline />
            <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" />
            <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Create</Button>
        </Box>
    );
}
