import { Icon, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { MdCancel } from 'react-icons/md';
import { RippleButtonProperties } from '../ripple-button';

import { ActionButton } from './action-button';

const buttonProperties = {
  bgColorScheme: 'red',
  gap: 2,
  variant: 'solid',
};

const ButtonContent: JSX.Element = (
  <>
    <Icon as={MdCancel} boxSize={5} />
    <Text>Cancel</Text>
  </>
);

export const CancelActionButton: FC<RippleButtonProperties> = (properties) => {
  const renderComponent = useCallback(
    (children) =>
      ActionButton({ ...properties, ...buttonProperties, children }),
    [properties]
  );

  return <>{renderComponent(ButtonContent)}</>;
};
