'use client';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CssBaseline from '@mui/material/CssBaseline';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={baselightTheme}>
      <SessionProvider>
        <CssBaseline />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
