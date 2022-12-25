/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  SlideFade,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AsyncCreatableSelect,
  AsyncSelect,
  ChakraStylesConfig,
  GroupBase,
  OptionsOrGroups,
  StylesConfig,
} from 'chakra-react-select';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import {
  Controller,
  FieldError,
  useForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { SubCard } from 'renderer/containers/cards';

type InputError = FieldError | undefined;

type InputErrors = Record<string, InputError>;

export type Option<T = any> = {
  readonly label: string;
  readonly value: T;
};

export type AutocompleteFieldProperties<T extends Option<T>> = {
  id: string;
  label?: string;
  extra?: JSX.Element;
  placeholder?: string;
  size?: string;
  isRequired?: boolean;
  inSubCard?: boolean;
  isReadOnly?: boolean;
  loadOptions: (inputValue?: string) => Promise<T>;
  handleCreate?: (inputValue: string) => any;
  defaultValue: T[];
  onChange: (values: string[] | string) => void;
  defaultOptions: T[];
  isMulti?: boolean;
  components?: any;
  noFormContext?: boolean;
};

export const AutocompleteField = <T extends Option<unknown>['value']>({
  id,
  label,
  extra,
  placeholder,
  size = 'lg',
  isRequired = false,
  inSubCard = false,
  isReadOnly = false,
  loadOptions,
  handleCreate,
  defaultValue,
  onChange,
  defaultOptions = [],
  isMulti = true,
  components,
  noFormContext = false,
}: AutocompleteFieldProperties<T>) => {
  const getFomContext = useMemo<any>(
    () => (noFormContext ? useForm : useFormContext),
    [noFormContext]
  );

  const {
    control,
    register,
    formState: { errors, dirtyFields },
  } = getFomContext({
    defaultValues: {
      [`${id}`]: defaultValue,
    },
  });

  const SelectComponent = handleCreate ? AsyncCreatableSelect : AsyncSelect;

  const [
    isMouseOnRequired,
    { on: onMouseOnRequired, off: offMouseOnRequired },
  ] = useBoolean(false);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const { ...errs } = errors;
  const { ...dirts } = dirtyFields;

  const error = useMemo(
    () => _.get<InputErrors, string>(errs as InputErrors, id),
    [errs]
  );
  const isError = useMemo(() => error !== undefined, [error]);
  const isDirty = useMemo(() => _.get(dirts, id, false), [dirts]);

  const chakraStyles: ChakraStylesConfig = {
    menu: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "black" : provided.background,
      p: 0,
      zIndex: 1000,
    }),
    menuList: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "black" : provided.background,
      p: 0,
      zIndex: 1000,
    }),
  };

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
        <Controller
          control={control}
          name={id}
          render={({ field }) => (
            <SelectComponent
              {...field}
              size={size}
              placeholder={placeholder}
              isReadOnly={isReadOnly}
              loadOptions={loadOptions}
              onCreateOption={handleCreate}
              value={defaultValue}
              onChange={(newValue: Option | Option[]) =>
                onChange(
                  isMulti
                    ? (newValue as Option[]).map(
                        (option: Option) => option.value as string
                      )
                    : ((newValue as Option).value as string)
                )
              }
              isMulti={isMulti}
              tagVariant="subtle"
              colorScheme="brand"
              variant="flushed"
              defaultOptions={defaultOptions}
              classNamePrefix="chakra-react-select"
              components={components}
              chakraStyle={chakraStyles}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};
