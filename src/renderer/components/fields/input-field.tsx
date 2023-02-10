// @ts-nocheck
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputProps,
  ScaleFade,
  Select,
  SelectProps,
  shouldForwardProp,
  SlideFade,
  Switch,
  SwitchProps,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import chroma from 'chroma-js';
import { isValidMotionProp, motion } from 'framer-motion';
import { get } from 'underscore';
import {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { MdError, MdInfo } from 'react-icons/md';
import { SubCard } from 'renderer/containers/cards';

type InputError = FieldError | undefined;

type InputErrors = Record<string, InputError>;

export type InputFieldProps = {
  id: string;
  label?: string;
  extra?: JSX.Element;
  placeholder?: string;
  type?: string;
  size?: string;
  isRequired?: boolean;
  helpText?: string;
  helpReadOnly?: string;
  inSubCard?: boolean;
  isReadOnly?: boolean;
};

const subCardAlertStyle: Partial<CSSProperties> = {
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
  helpText,
  helpReadOnly,
  inSubCard = false,
  isReadOnly = false,
}) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const [
    isMouseOnRequired,
    { on: onMouseOnRequired, off: offMouseOnRequired },
  ] = useBoolean(false);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const FormInputComponent = (
    inputProperties: InputProps & (SwitchProps | SelectProps),
    inputChildren?: ReactNode
  ) => {
    const { type: inputType, ...inputRest } = inputProperties;

    if (inputType === 'select') {
      return <Select {...(inputRest as SelectProps)}>{inputChildren}</Select>;
    }
    if (inputType === 'checkbox') {
      return (
        <Switch {...(inputRest as SwitchProps)} pb={3}>
          {inputChildren}
        </Switch>
      );
    }
    return <Input {...(inputProperties as InputProps)}>{inputChildren}</Input>;
  };

  const { ...errs } = errors;
  const { ...dirts } = dirtyFields;

  const error = useMemo(
    () => get<InputErrors, string>(errs as InputErrors, id),
    [errs]
  );
  const isError = useMemo(() => error !== undefined, [error]);
  const isDirty = useMemo(() => get<boolean>(dirts, id, false), [dirts]);

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (property) =>
      isValidMotionProp(property) || shouldForwardProp(property),
  });

  return (
    <Box as={inSubCard ? SubCard : Box}>
      <FormControl isInvalid={isError}>
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
              <Alert variant="solid" mt={1} p={inSubCard ? '14px' : 1}>
                <AlertIcon as={MdError} mr={1} zIndex={1} />
                <AlertDescription fontSize="xs" zIndex={1}>
                  {error?.message}
                </AlertDescription>
                <ChakraBox
                  position="absolute"
                  top={0}
                  left={-5}
                  height="125%"
                  width="100%"
                  display="flex"
                  opacity={0.8}
                  animate={{
                    background: [
                      'linear-gradient(180deg, #cb2d3e 0%, #ef473a 100%)',
                      'linear-gradient(180deg, #cb2d3e 100%, #ef473a 100%)',
                      'linear-gradient(180deg, #ef473a 100%, #cb2d3e 0%)',
                      'linear-gradient(180deg, #ef473a 100%, #cb2d3e 100%)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'backInOut',
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    opacity: 0.8,
                  }}
                  whileHover={{
                    transition: {
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    },
                    opacity: 1,
                  }}
                />
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
                bg={
                  isReadOnly && helpReadOnly !== undefined
                    ? 'gray.600'
                    : 'primary.600'
                }
                variant="solid"
                mt={1}
                p={inSubCard ? '14px' : 1}
              >
                <AlertIcon as={MdInfo} mr={2} zIndex={1} />
                <AlertDescription fontSize="xs" zIndex={1}>
                  {isReadOnly && helpReadOnly !== undefined
                    ? helpReadOnly
                    : helpText}
                </AlertDescription>
                <ChakraBox
                  position="absolute"
                  top={0}
                  left={-5}
                  height="125%"
                  width="100%"
                  display="flex"
                  opacity={0.6}
                  animate={{
                    background: [
                      `linear-gradient(60deg, ${isReadOnly ? '#33373d' : '#7434db'} 0%, ${chroma(isReadOnly ? '#abadaf' : '#7434db')
                        .brighten(0.2)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, ${isReadOnly ? '#33373d' : '#7434db'} 0%, ${chroma(isReadOnly ? '#abadaf' : '#7434db')
                        .brighten(1)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, ${chroma(isReadOnly ? '#abadaf' : '#7434db')
                        .brighten(1.2)
                        .hex()} 0%, ${isReadOnly ? '#33373d' : '#7434db'} 100%)`,
                      `linear-gradient(60deg, ${chroma(isReadOnly ? '#abadaf' : '#7434db')
                        .brighten(0)
                        .hex()} 0%, ${isReadOnly ? '#33373d' : '#7434db'} 100%)`,
                    ],
                  }}
                  transition={{
                    duration: 10,
                    ease: 'backInOut',
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    opacity: 0.6,
                  }}
                  whileHover={{
                    transition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    },
                    opacity: 1,
                  }}
                />
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
                variant="subtle"
                mt={1}
                p={inSubCard ? '14px' : 1}
                color="white"
              >
                <AlertIcon as={MdInfo} mr={1} zIndex={1} color="white" />
                <AlertDescription fontSize="xs" zIndex={1}>Not saved !!!</AlertDescription>
                <ChakraBox
                  position="absolute"
                  top={0}
                  left={-5}
                  height="125%"
                  width="100%"
                  display="flex"
                  opacity={0.5}
                  animate={{
                    background: [
                      'linear-gradient(180deg, #314755 10%, #26a0da 100%)',
                      'linear-gradient(180deg, #26a0da 50%, #314755 100%)',
                    ],
                  }}
                  transition={{
                    duration: 5,
                    ease: 'backInOut',
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    opacity: 0.5,
                  }}
                  whileHover={{
                    transition: {
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    },
                    opacity: 0.8,
                  }}
                />
              </Alert>
            </ScaleFade>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
