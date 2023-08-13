import { useState } from 'react';
import { styled, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header.jsx';
import Sidebar from './sidebar/Sidebar.jsx';

const MainWrapper = styled( 'div' )( () => ( {
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
} ) );

const PageWrapper = styled( 'div' )( () => ( {
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
} ) );

const FullLayout = () => {
  const [ isSidebarOpen, setSidebarOpen ] = useState( true );
  const [ isMobileSidebarOpen, setMobileSidebarOpen ] = useState( false );

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen( false )}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toggleSidebar={() => setSidebarOpen( !isSidebarOpen )}
          toggleMobileSidebar={() => setMobileSidebarOpen( true )}
        />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}

        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
          <Outlet />
        </Box>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
