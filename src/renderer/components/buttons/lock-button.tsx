import { Button, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { BsShieldLockFill } from 'react-icons/bs';
import { Tooltip } from '../dataDisplay';

export type LockButtonProperties = {
  onClick: () => void;
};

export const LockButton: FC<LockButtonProperties> = ({ onClick }) => (
  <Tooltip label="Logout / Lock">
    <Button onClick={onClick}>
      <Icon as={BsShieldLockFill} boxSize={18} />
    </Button>
  </Tooltip>
);
