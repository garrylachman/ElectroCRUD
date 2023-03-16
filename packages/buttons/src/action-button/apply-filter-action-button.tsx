import { Icon, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { MdSave } from 'react-icons/md';
import { RippleButtonProperties } from '../ripple-button';

import { ActionButton } from './action-button';

const buttonProperties = {
  bgColorScheme: 'primary',
  gap: 2,
  variant: 'solid',
};

const ButtonContent = (
  <>
    <Icon as={MdSave} boxSize={5} />
    <Text>Apply Filter</Text>
  </>
);

export const ApplyFilterActionButton: FC<RippleButtonProperties> = (
  properties
) => {
  const renderComponent = useCallback(
    (children) =>
      ActionButton({ ...properties, ...buttonProperties, children }),
    [properties]
  );

  return <>{renderComponent(ButtonContent)}</>;
};
