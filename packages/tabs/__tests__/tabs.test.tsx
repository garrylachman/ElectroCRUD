import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TabProperties, Tabs } from '../src/tabs';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../src/renderer/theme/theme';
import { TabClose } from '../src/list';

test('tab close icon', () => {
  const clickFunction = jest.fn();
  const { getByTestId } = render(
    <ChakraProvider theme={theme}>
      <TabClose onClose={clickFunction} />
    </ChakraProvider>
  );

  const tabClose = getByTestId('tab-close');
  fireEvent.click(tabClose);
  expect(clickFunction).toHaveBeenCalledTimes(1);
});
