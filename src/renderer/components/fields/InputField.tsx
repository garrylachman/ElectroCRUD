/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormLabel,
  Input,
  useColorModeValue,
  FormControl,
  Flex,
  Badge,
  Icon,
  useBoolean,
  ScaleFade,
  Select,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  SlideFade,
  Switch,
  InputProps,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useMemo, PropsWithChildren, ReactNode } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { MdError, MdInfo } from 'react-icons/md';
import { SubCard } from 'renderer/containers/cards';

export type InputFieldProps = {
  id: string;
  label?: string;
  extra?: JSX.Element;
  placeholder?: string;
  type?: string;
  size?: string;
  isRequired?: boolean;
  onUpdate?: () => void;
  helpText?: string;
  helpReadOnly?: string;
  inSubCard?: boolean;
  context?: UseFormReturn;
  isReadOnly?: boolean;
};

const subCardAlertStyle = {
  bottom: '5px',
  position: 'relative',
  width: '125%',
  left: '-20px',
  overflow: 'hidden',
};

export const InputField: FC<PropsWithChildren<InputFieldProps>> = ({
  id,
  label,
  extra,
  placeholder,
  type,
  size = 'lg',
  isRequired = false,
  children,
  onUpdate,
  helpText,
  helpReadOnly,
  inSubCard = false,
  context,
  isReadOnly = false,
}) => {
  const {
    register,
    formState: { errors, dirtyFields },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = context || useFormContext();

  const [
    isMouseOnRequired,
    { on: onMouseOnRequired, off: offMouseOnRequired },
  ] = useBoolean(false);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const FormInputComponent = (
    inputProps: InputProps,
    inputChildren?: ReactNode
  ) => {
    const { type: inputType, ...inputRest } = inputProps;

    if (inputType === 'select') {
      return <Select {...inputRest}>{inputChildren}</Select>;
    }
    if (inputType === 'checkbox') {
      return (
        <Switch {...inputRest} pb={3}>
          {inputChildren}
        </Switch>
      );
    }
    return <Input {...inputRest}>{inputChildren}</Input>;
  };

  const { ...errs } = errors;
  const { ...dirts } = dirtyFields;

  const error = useMemo(() => _.get(errs, id, undefined), [errs]);
  const isError = useMemo(() => error !== undefined, [error]);
  const isDirty = useMemo(() => _.get(dirts, id, false), [dirts]);

  return (
    <Box as={inSubCard ? SubCard : Box}>
      <FormControl isInvalid={error !== undefined}>
        <FormLabel
          display="flex"
          htmlFor={id}
          fontSize={size}
          color={textColorPrimary}
          fontWeight="bold"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          mr={0}
        >
          <Flex alignItems="center">
            {label}
            <Box ml={2} display="inline-flex" height="min-content">
              {extra}
            </Box>
          </Flex>
          {isRequired && (
            <Badge
              colorScheme="blackAlpha"
              variant="subtle"
              fontSize="8px"
              alignItems="center"
              display="inline-flex"
              onMouseEnter={onMouseOnRequired}
              onMouseLeave={offMouseOnRequired}
              cursor="pointer"
            >
              <Icon
                as={FaAsterisk}
                mr={isMouseOnRequired ? 1 : 0}
                color="red"
              />
              <SlideFade
                offsetY={0}
                offsetX={-10}
                in={isMouseOnRequired}
                unmountOnExit
                reverse
              >
                Required
              </SlideFade>
            </Badge>
          )}
        </FormLabel>
        {FormInputComponent(
          {
            id,
            type,
            fontWeight: '500',
            variant: 'flushed',
            size,
            placeholder,
            _placeholder: { fontWeight: '400', color: 'secondaryGray.600' },
            ...register(id),
            isDisabled: isReadOnly,
          },
          children
        )}
        <Box h={inSubCard ? '36px' : 0}>
          <Box style={inSubCard ? subCardAlertStyle : { overflow: 'hidden' }}>
            <ScaleFade
              initialScale={3}
              in={isError}
              style={{ width: '100%' }}
              unmountOnExit
              reverse
            >
              <Alert
                status="error"
                variant="solid"
                mt={1}
                p={inSubCard ? '14px' : 1}
              >
                <AlertIcon as={MdError} mr={1} />
                <AlertDescription fontSize="xs">
                  {error?.message}
                </AlertDescription>
              </Alert>
            </ScaleFade>
            <ScaleFade
              initialScale={3}
              in={helpText !== undefined && !isError && !isDirty}
              style={{ width: '100%' }}
              unmountOnExit
              reverse
            >
              <Alert
                colorSchema={
                  isReadOnly && helpReadOnly !== undefined ? 'orange' : 'brand'
                }
                status={isReadOnly && helpReadOnly !== undefined ? 'warning' : undefined}
                variant="solid"
                mt={1}
                p={inSubCard ? '14px' : 1}
              >
                <AlertIcon as={MdInfo} mr={1} />
                <AlertDescription fontSize="xs">
                  {isReadOnly && helpReadOnly !== undefined
                    ? helpReadOnly
                    : helpText}
                </AlertDescription>
              </Alert>
            </ScaleFade>
            <ScaleFade
              initialScale={3}
              in={isDirty && !isError}
              style={{ width: '100%' }}
              unmountOnExit
              reverse
            >
              <Alert
                status="warning"
                variant="subtle"
                mt={1}
                p={inSubCard ? '14px' : 1}
              >
                <AlertIcon as={MdInfo} mr={1} />
                <AlertDescription fontSize="xs">Not saved !!!</AlertDescription>
              </Alert>
            </ScaleFade>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
