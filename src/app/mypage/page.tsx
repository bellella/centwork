"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div style={{ padding: "2rem" }}>Loading...</div>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome, {session?.user?.name}</h1>
            <p>Your email: {session?.user?.email}</p>
        </div>
    );
}
