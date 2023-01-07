import { Icon, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { MdSave } from 'react-icons/md';

import { ActionButton, ActionButtonProperties } from './action-button';

const buttonProperties = {
  bgColorScheme: 'primary',
  gap: 2,
  variant: 'solid',
};

const buttonContent: JSX.Element = (
  <>
    <Icon as={MdSave} boxSize={5} />
    <Text>Save</Text>
  </>
);

export const SaveActionButton: FC<ActionButtonProperties> = (properties) => {
  const renderComponent = useMemo(
    () => ActionButton({ ...properties, ...buttonProperties }),
    [properties]
  );
  return <>{renderComponent(buttonContent)}</>;
};
