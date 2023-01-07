import * as R from 'ramda';
import { ReactNode } from 'react';

import { RippleButton, RippleButtonProperties } from '../ripple-button';

export type ActionButtonProperties = Partial<RippleButtonProperties>;

export const ActionButton = R.curry(
  (properties: ActionButtonProperties, children?: ReactNode) => (
    <RippleButton
      variant="solid"
      bgColorScheme={properties.colorScheme || 'primary'}
      {...R.omit(['bgColor', 'actionName'], properties)}
    >
      {children}
    </RippleButton>
  )
);
