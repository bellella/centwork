'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { IconUser, IconClipboardData } from '@tabler/icons-react';
import HistoryIcon from '@mui/icons-material/History';
import { useSession, signOut } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="user profile"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="avatar"
          sx={{ width: 35, height: 35, mr: 1 }}
        />
        {session?.user?.name && (
          <Typography variant="subtitle2" fontWeight={600}>
            {session.user.name}
          </Typography>
        )}
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <Link href="/mypage" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>MyPage</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/myProducts" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <ListItemIcon>
              <IconClipboardData width={20} />
            </ListItemIcon>
            <ListItemText>My Products</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/transactionHistory" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <ListItemIcon>
              <HistoryIcon width={20} />
            </ListItemIcon>
            <ListItemText>Transaction History</ListItemText>
          </MenuItem>
        </Link>

        <Box mt={1} py={1} px={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
