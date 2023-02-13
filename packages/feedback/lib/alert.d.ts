import { AlertProps } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

type AlertProperties = AlertProps & {
    icon?: IconType;
    title: string;
    description?: string;
};
declare const Alert: FC<AlertProperties>;

export { Alert, AlertProperties };
