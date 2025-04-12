'use client';

import { socket } from '@/socket';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Message {
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
}

export default function TestingChatRoom({ params }: { params: { id: string } }) {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: session } = useSession();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true);
      if (session?.user?.id) {
        socket.emit('joinRoom', {
          roomId: params?.id,
          userId: session?.user?.id,
          userName: session?.user?.name || 'Anonymous',
        });
      }
    }

    // Listen for incoming messages
    socket.on('chatMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for message history
    socket.on('messageHistory', (history: Message[]) => {
      setMessages(history);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('messageHistory');
    };
  }, [session?.user?.id, session?.user?.name, params?.id]);

  const handleSendMessage = () => {
    if (message.trim() && session?.user?.id) {
      const msg = {
        roomId: params?.id,
        content: message,
        senderId: session.user.id,
        senderName: session.user.name || 'Anonymous',
      };
      socket.emit('chatMessage', msg);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Box p={3}>
      <Button variant="contained" onClick={() => router.push('/testingChat')}>
        Back
      </Button>
      <h1>TestingChatRoom</h1>
      <p>Room ID: {params?.id}</p>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>

      <Box
        sx={{
          height: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          p: 2,
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              pl: 4,
              pr: 4,
              mb: 1,
              backgroundColor: msg.senderId === session?.user?.id ? '#e3f2fd' : '#f5f5f5',
              borderRadius: 1,
              textAlign: msg.senderId === session?.user?.id ? 'right' : 'left',
            }}
          >
            <p>{msg.content}</p>
            <small>
              {msg.senderName} - {formatTime(msg.timestamp)}
            </small>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}
