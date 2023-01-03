import { Switch } from '@chakra-ui/react';
import { FC } from 'react';

import { ConfigControl } from './config-control';

export const ConfigSwitch: FC<ConfigControl> = ({ value, onUpdate }) => {
  return (
    <Switch
      defaultChecked={value}
      onChange={(event_) => onUpdate(event_.target.checked)}
    />
  );
};
