import {
  Alert as OriginalAlert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Icon,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { O } from 'ts-toolbelt';

export type AlertProperties = O.Merge<{
    icon?: IconType;
    title: string;
    description?: string;
  },
  AlertProps
>;

export const Alert: FC<AlertProperties> = ({
  title,
  description,
  icon,
  status,
}) => (
  <OriginalAlert status={status} display="flex" flexDirection="column">
    {}
    {icon ? <Icon as={icon} boxSize={10} /> : <AlertIcon boxSize={10} />}
    <AlertTitle display="flex" fontWeight="extrabold">{title}</AlertTitle>
    {description && (
      <AlertDescription display="flex" fontWeight="light">
        {description}
      </AlertDescription>
    )}
  </OriginalAlert>
);
