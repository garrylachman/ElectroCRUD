import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RippleButton } from '../src/ripple-button';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../src/renderer/theme/theme';

test('button with text', () => {
  const { getByText, getByRole } = render(
    <ChakraProvider theme={theme}>
      <RippleButton variant="solid" bgColorScheme="primary" size="lg">
        Save
      </RippleButton>
    </ChakraProvider>
  );
  expect(getByText('Save')).toBeTruthy();
  expect(getByRole('button')).not.toBeDisabled();
});

test('disabled button', () => {
  const { getByRole } = render(
    <ChakraProvider theme={theme}>
      <RippleButton isDisabled>Save</RippleButton>
    </ChakraProvider>
  );
  expect(getByRole('button')).toBeDisabled();
  expect(getByRole('button')).toHaveAttribute('disabled');
});

test('click', () => {
  const clickFunction = jest.fn();
  const { getByRole } = render(
    <ChakraProvider theme={theme}>
      <RippleButton onClick={clickFunction}>Save</RippleButton>
    </ChakraProvider>
  );

  const button = getByRole('button');
  fireEvent.click(button);
  expect(clickFunction).toHaveBeenCalledTimes(1);
});

test('click disabled', () => {
  const clickFunction = jest.fn();
  const { getByRole } = render(
    <ChakraProvider theme={theme}>
      <RippleButton onClick={clickFunction} isDisabled>
        Save
      </RippleButton>
    </ChakraProvider>
  );

  const button = getByRole('button');
  fireEvent.click(button);
  expect(clickFunction).toHaveBeenCalledTimes(0);
});
