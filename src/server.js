// server.ts or server.mjs (with type: "module" in package.json)
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
const hostname = 'localhost';
const port = 3000;

// Optional: if using Prisma inside this file
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room: ${roomId}`);

      // Find the room object
      const room = [room1, room2, room3].find((r) => r.id === roomId);
      if (room) {
        // Send message history to the user
        socket.emit('messageHistory', room.messages);
      }
    });

    socket.on('chatMessage', (msg) => {
      // Add timestamp to message
      const messageWithTimestamp = {
        ...msg,
        timestamp: new Date().toISOString(),
      };

      // Find the room object and store the message
      const room = [room1, room2, room3].find((r) => r.id === msg.roomId);
      if (room) {
        room.messages.push(messageWithTimestamp);
        // Broadcast to room
        io.to(msg.roomId).emit('chatMessage', messageWithTimestamp);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});

const room1 = {
  id: '1',
  name: 'Room 1',
  messages: [],
};

const room2 = {
  id: '2',
  name: 'Room 2',
  messages: [],
};

const room3 = {
  id: '3',
  name: 'Room 3',
  messages: [],
};
