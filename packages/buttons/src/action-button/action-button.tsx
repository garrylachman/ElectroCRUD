import { omit } from 'underscore';
import { FC } from 'react';

import { RippleButton, RippleButtonProperties } from '../ripple-button';

export const ActionButton: FC<RippleButtonProperties> = ({
  children,
  ...properties
}) => (
  <RippleButton
    variant="solid"
    size="md"
    bgColorScheme={properties.colorScheme || 'primary'}
    {...omit(properties, ['bgColor', 'actionName'])}
  >
    {children}
  </RippleButton>
);
