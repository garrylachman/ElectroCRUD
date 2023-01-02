import { Box, useColorModeValue } from '@chakra-ui/react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  renderThumb,
  renderTrack,
  renderView,
} from 'renderer/components/scrollbar/Scrollbar';
import Content from 'renderer/components/sidebar/components/Content';

export function Sidebar() {
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );

  const sidebarBg = useColorModeValue('white', 'navy.800');

  return (
    <Box
      as="nav"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      borderRadius="3xl"
      bg={sidebarBg}
      boxShadow={shadow}
      minH="100%"
    >
      <Scrollbars
        autoHide
        renderTrackVertical={renderTrack}
        renderThumbVertical={renderThumb}
        renderView={renderView}
      >
        <Content />
      </Scrollbars>
    </Box>
  );
}
