import { FC } from 'react';

type LockButtonProperties = {
    onClick: () => void;
};
declare const LockButton: FC<LockButtonProperties>;

export { LockButton, LockButtonProperties };
