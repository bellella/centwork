'use client';

import { socket } from '../../../socket';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function TestingChat() {
  // You won't be able to deploy your application on Vercel, as it does not support WebSocket connections.
  // https://socket.io/how-to/use-with-nextjs

  const { data: session } = useSession();
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      console.log('connected client');
      setIsConnected(true);
    }

    socket.on('connect', () => {
      console.log('connected server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected server');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect', () => {
        console.log('disconnect client');
      });
      socket.off('disconnect', () => {
        console.log('disconnect client');
      });
    };
  }, []);

  return (
    <div>
      <h1>TestingChat</h1>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      <Box display="flex" gap={2} flexDirection="column">
        <div>haha</div>
        <Button variant="contained" onClick={() => router.push('/testingChat/1')}>
          Join Room 1
        </Button>
        <Button variant="contained" onClick={() => router.push('/testingChat/2')}>
          Join Room 2
        </Button>
        <Button variant="contained" onClick={() => router.push('/testingChat/3')}>
          Join Room 3
        </Button>
      </Box>
    </div>
  );
}
