/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormLabel,
  useColorModeValue,
  FormControl,
  Flex,
  Badge,
  Icon,
  useBoolean,
  Box,
  SlideFade,
} from '@chakra-ui/react';
import {
  AsyncCreatableSelect,
  OptionsOrGroups,
  GroupBase,
  StylesConfig,
  SelectComponent,
} from 'chakra-react-select';
import _ from 'lodash';
import { useMemo } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { SubCard } from 'renderer/containers/cards';

type InputError = FieldError | undefined;

type InputErrors = Record<string, InputError>;

type Option = {
  readonly label: string;
  readonly value: string;
};

type OptionGroup = OptionsOrGroups<Option, GroupBase<Option>>;

export type AutocompleteFieldProps<T extends Option> = {
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
  onChange: (values: string[]) => void;
  defaultOptions: T[];
  isMulti?: boolean;
  components?: any;
};

export const AutocompleteField = <T extends Option>({
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
}: AutocompleteFieldProps<T>) => {
  const {
    register,
    formState: { errors, dirtyFields },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFormContext();

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

  const optionStyle: StylesConfig<Option, true> = {
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: 'red',
      color: 'red',
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: 'red',
      };
    },
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
          {...register(id)}
          render={({ field }) => (
            <AsyncCreatableSelect
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
                    ? (newValue.map(
                        (value: string[]) => value.value as string
                      ) as string[])
                    : (newValue.value as string)
                )
              }
              isMulti={isMulti}
              tagVariant="subtle"
              colorScheme="brand"
              variant="flushed"
              defaultOptions={defaultOptions}
              classNamePrefix="chakra-react-select"
              components={components}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};
