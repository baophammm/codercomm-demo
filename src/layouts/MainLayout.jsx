import { Box, Stack } from '@mui/material';
import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <Stack sx={{ minHeight: '100vh' }}>
        <MainHeader />
        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </div>
  );
}

export default MainLayout;
