import { ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { O } from 'ts-toolbelt';

type RippleButtonProperties = O.Omit<O.Merge<ButtonProps, {
    bgColor?: {
        step1: string;
        step2: string;
        step3: string;
    };
    bgColorScheme?: string;
}>, 'key'>;
declare const RippleButton: FC<RippleButtonProperties>;

export { RippleButton, RippleButtonProperties };
