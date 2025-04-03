'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Box, TextField, Button, Typography, Stack, Paper } from '@mui/material';
import ProductDetail from '@/app/components/messages/ProductDetail';
import { MessageRoom } from '@prisma/client';
import { getProduct, getRoomInfo } from '@/app/_actions/getProduct';
import { ExtendedProduct } from '@/types/extendProduct';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export default function MessageRoomPage() {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params.roomId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [roomInfo, setRoomInfo] = useState<MessageRoom | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Polling: 3초마다 메시지 가져오기
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${roomId}`);
      const data = await res.json();
      setMessages(data);
    };

    const fetchProduct = async () => {
      const data = await getProduct(roomId);
      setProduct(data);
    };

    const fetchRoomInfo = async () => {
      const data = await getRoomInfo(roomId);
      setRoomInfo(data);
    };

    fetchMessages();
    fetchProduct();
    fetchRoomInfo();

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [roomId]);

  // 스크롤 항상 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    await fetch(`/api/messages/${roomId}`, {
      method: 'POST',
      body: JSON.stringify({ content: input }),
      headers: { 'Content-Type': 'application/json' },
    });

    setInput('');
  };

  return (
    <Box p={3} height="80vh" display="flex" flexDirection="column">
      <ProductDetail product={product} roomInfo={roomInfo!} />

      <Typography variant="h5" mb={2}>
        Chat
      </Typography>

      <Box flex={1} overflow="auto" mb={2}>
        <Stack spacing={1}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              alignSelf={msg.senderId === session?.user?.id ? 'flex-end' : 'flex-start'}
              component={Paper}
              px={2}
              py={1}
              sx={{
                backgroundColor: msg.senderId === session?.user?.id ? '#e0f7fa' : '#f0f0f0',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body1">{msg.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}
