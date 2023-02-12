import React from 'react';
import { render } from '@testing-library/react';
import { RippleButton } from '../src/ripple-button';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../src/renderer/theme/theme';

test('renders with text', () => {
  const { getByText } = render(
    <ChakraProvider theme={theme}>
      <RippleButton variant="solid" bgColorScheme="primary" size="lg">
        Save
      </RippleButton>
    </ChakraProvider>
  );
  expect(getByText('Save')).toBeTruthy();
});
