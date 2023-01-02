import { Input } from '@chakra-ui/react';
import { FC } from 'react';

import { ConfigControl } from './config-control';

export const ConfigInput: FC<ConfigControl> = ({ value, onUpdate }) => {
  return (
    <Input
      flex={1}
      size="xs"
      variant="flushed"
      defaultValue={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};
