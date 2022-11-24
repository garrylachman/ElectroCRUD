// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import Footer from '../../components/footer/FooterAdmin';
// Layout components
import Navbar from '../../components/navbar/NavbarAdmin';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { SidebarContext } from '../../contexts/SidebarContext';

// Custom Chakra theme
export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [title, setTitle] = useState<string>();
  const matches = useMatches();
  useEffect(() => {
    const title: string = matches
      .filter((match) => Boolean((match.handle as any)?.title))
      .map((match) => (match.handle as any)?.title)
      .pop();
    setTitle(title);
  }, [matches]);

  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText="Horizon UI Dashboard PRO"
                brandText={title || ''}
                secondary
                fixed={false}
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            <Outlet />
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
