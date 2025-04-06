'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUser } from '@/app/_actions/user';
import { UserUpdateData } from '@/types/user';

export default function MyPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      setName(session?.user?.name || '');
    }
  }, [status, router, session]);

  if (status === 'loading') {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  const handleUpdate = async () => {
    const updateData: UserUpdateData = { name, email: session?.user?.email || '' };

    if (password) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      updateData.password = password;
    }

    const result = await updateUser(updateData);
    if (result?.success) {
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updateData.name,
        },
      });
      alert('User updated successfully');
    } else {
      alert('Failed to update user');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {session?.user?.name}</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Email</Typography>
          <TextField type="email" value={session?.user?.email} disabled sx={{ width: '50%' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Name</Typography>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '50%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Password</Typography>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '50%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Confirm Password</Typography>
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ width: '50%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </div>
  );
}
