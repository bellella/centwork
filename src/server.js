// server.ts or server.mjs (with type: "module" in package.json)
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

// Optional: if using Prisma inside this file
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url || "/", true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
        path: "/api/socket.io",
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on("chatMessage", (msg) => {
            io.to(msg.roomId).emit("chatMessage", msg);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    server.listen(3000, () => {
        console.log("> Ready on http://localhost:3000");
    });
});
