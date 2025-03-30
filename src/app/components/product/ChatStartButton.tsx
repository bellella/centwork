"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ChatStartButton({
                                       productId,
                                       sellerId,
                                   }: {
    productId: string;
    sellerId: string;
}) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleStartChat = async () => {
        setLoading(true);
        const res = await fetch("/api/messages/start", {
            method: "POST",
            body: JSON.stringify({ productId, sellerId }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            router.push(`/messages/${data.roomId}`);
        } else {
            alert(data.error || "Failed to start chat.");
        }
    };

    if (!session || session.user.id === sellerId) return null; // 본인이거나 비로그인 → 버튼 X

    return (
        <Button
            variant="outlined"
            onClick={handleStartChat}
            disabled={loading}
            sx={{ mt: 2 }}
        >
            {loading ? "Starting chat..." : "💬 Chat with Seller"}
        </Button>
    );
}
