import { Icon, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { MdCancel } from 'react-icons/md';

import { ActionButton, ActionButtonProperties } from './action-button';

const buttonProperties = {
  bgColorScheme: 'red',
  gap: 2,
  variant: 'solid',
};

const buttonContent: JSX.Element = (
  <>
    <Icon as={MdCancel} boxSize={5} />
    <Text>Cancel</Text>
  </>
);

export const CancelActionButton: FC<ActionButtonProperties> = (properties) => {
  const renderComponent = useMemo(
    () => ActionButton({ ...properties, ...buttonProperties }),
    [properties]
  );
  // @ts-ignore
  return <>{renderComponent(buttonContent)}</>;
};
