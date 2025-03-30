import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function useSocket(roomId: string): Socket {
    useEffect(() => {
        socket = io({
            path: "/api/socket.io",
        });

        socket.emit("joinRoom", roomId);

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return socket;
}
