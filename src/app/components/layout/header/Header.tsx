'use client';

import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CentennailLogo from '/public/images/logos/CentennialMarket.png';
import Image from 'next/image';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session } = useSession(); // 로그인 상태 확인

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/*<Link href="/public">*/}
        {/*  <Image*/}
        {/*    src={CentennailLogo}*/}
        {/*    alt="Centennial Market"*/}
        {/*    priority*/}
        {/*    style={{*/}
        {/*      width: 'auto',*/}
        {/*      height: 'auto',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Link>*/}

        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* <IconButton
              size="large"
              aria-label="notifications"
              color="inherit"
              aria-controls="msgs-menu"
              aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton> */}

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          {session && (
            <Button component={Link} href="/products/new" variant="outlined" color="primary">
              + Add Product
            </Button>
          )}
          {!session && (
            <Button
              variant="contained"
              component={Link}
              href="/login"
              disableElevation
              color="primary"
            >
              Login
            </Button>
          )}
          {session && <Profile />}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
