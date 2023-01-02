import { Input, Select } from '@chakra-ui/react';
import { FC } from 'react';

import { ConfigControl } from './config-control';

export const ConfigSelect: FC<ConfigControl> = ({ value, options, onUpdate }) => {
  return (
    <Select
      flex={1}
      size="xs"
      variant="flushed"
      defaultValue={value}
      onChange={(e) => onUpdate(e.target.value)}
    >
      {options?.map((item) => (
        <option>{item}</option>
      ))}
    </Select>
  );
};
