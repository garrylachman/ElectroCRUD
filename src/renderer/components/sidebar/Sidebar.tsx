import { Box, useColorModeValue } from '@chakra-ui/react';
import Content from 'renderer/components/sidebar/components/Content';
import {
  renderThumb,
  renderTrack,
  renderView,
} from 'renderer/components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';

export function Sidebar() {
  // this is for the rest of the collapses
  const variantChange = '0.2s linear';
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  // Chakra Color Mode
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarRadius = '30px';
  const sidebarMargins = '0px';
  // SIDEBAR
  return (
    <Box display={{ sm: 'none', xl: 'block' }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: '10px',
        }}
        my={{
          sm: '10px',
        }}
        mb={{
          sm: '0px',
        }}
        h="calc(100vh - 20px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={[]} />
        </Scrollbars>
      </Box>
    </Box>
  );
}
