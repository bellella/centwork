import { Avatar, Box, Typography, Stack } from '@mui/material';
import Link from 'next/link';

interface MessageItemProps {
  roomId: string;
  peerName: string;
  peerAvatarUrl?: string;
  lastMessage?: string;
}

export default function MessageItem({
  roomId,
  peerName,
  peerAvatarUrl = '/images/profile/user-1.jpg',
  lastMessage = 'No messages yet.',
}: MessageItemProps) {
  return (
    <Link
      href={`/messages/${roomId}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          p: 1.5,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Avatar src={peerAvatarUrl} alt={peerName} sx={{ width: 35, height: 35 }} />
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {peerName}
          </Typography>
          <Typography color="textSecondary" fontSize={13}>
            {lastMessage}
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
}
