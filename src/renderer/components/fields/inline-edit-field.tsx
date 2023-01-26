import {
  Box,
  ButtonGroup,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Icon,
  IconButton,
  InputProps,
  useEditableControls,
} from '@chakra-ui/react';
import { OptionsOrGroups, Select } from 'chakra-react-select';
import { omit } from 'underscore';
import react, { ChangeEvent, FC, forwardRef, PropsWithChildren } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { MdClose, MdEdit, MdOutlineCheck } from 'react-icons/md';

const ReactSelect: FC<
  InputProps & {
    options: OptionsOrGroups<any, any>;
    control: Control;
    hidden: boolean;
  }
> = forwardRef((properties, reference) => {
  const { options, ...rest } = { ...properties, ref: reference };
  return (
    // @ts-ignore
    <Controller
      {...rest}
      render={({ field: { name, ref: inReference } }) => (
        <Box hidden={rest.hidden}>
          <Select
            name={name}
            ref={inReference}
            onBlur={rest.onBlur}
            options={options}
            value={options.find(
              (c: { value: string | number }) => c.value === rest.value
            )}
            onChange={(option: { value: string | number }) => {
              if (rest.onChange) {
                const eventValue = { name, value: option.value };
                rest.onChange({
                  target: eventValue,
                  currentTarget: eventValue,
                } as react.ChangeEvent<HTMLInputElement>);
              }
            }}
          />
        </Box>
      )}
    />
  );
});

export type InlineEditFieldProperties = {
  id: string;
  placeholder?: string;
  type?: string;
  fontSize?: string;
  selectOptions?: Record<string, string>[];
};

const ShowUnderline = () => {
  const { isEditing } = useEditableControls();
  return (
    <Divider
      borderTopWidth={isEditing ? 0 : 2}
      borderBottomWidth="0px"
      borderColor="primary.500"
    />
  );
};

export const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup
      justifyContent="end"
      size="md"
      w="full"
      spacing={2}
      mt={3}
      position="relative"
      top="-4px"
    >
      <IconButton
        variant="solid"
        colorScheme="primary"
        icon={<Icon as={MdOutlineCheck} />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        variant="outline"
        colorScheme="red"
        icon={<Icon as={MdClose} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex
      justifyContent="flex-start"
      sx={{
        position: 'absolute',
        right: '4px',
        top: '4px',
      }}
    >
      <IconButton
        size="sm"
        variant="solid"
        colorScheme="primary"
        icon={<Icon as={MdEdit} boxSize={4} />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

const InputFactory = forwardRef((properties, reference) => {
  const { formProps, ...rest } = properties;
  switch (rest.type) {
    case 'textarea': {
      return <EditableTextarea {...rest} {...formProps} />;
    }
    case 'dropdown': {
      return (
        <ReactSelect
          {...rest}
          {...formProps}
          ref={reference}
          onChange={(event: ChangeEvent) => {
            rest.onChange(event);
            formProps.onChange(event);
          }}
        />
      );
    }
    default: {
      return <EditableInput {...rest} {...formProps} variant="flushed" />;
    }
  }
});

export const RenderHTML: FC<PropsWithChildren> = ({ ...properties }) => (
  <Box>
    {properties?.children && (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: properties.children?.toString()?.split('\n').join('<br/>'),
        }}
        {...omit(properties, ['children', 'ref'])}
      />
    )}
  </Box>
);

export const InlineEditField: FC<
  PropsWithChildren<InlineEditFieldProperties>
> = ({
  id,
  placeholder,
  type = 'text',
  fontSize = 'md',
  selectOptions = [],
}) => {
  const { register, watch } = useFormContext();
  const value = watch(id);

  return (
    <Editable
      defaultValue={value}
      value={value}
      isPreviewFocusable
      selectAllOnFocus={false}
      placeholder={placeholder}
      variant="flushed"
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <EditablePreview
        py={2}
        px={0}
        fontSize={fontSize}
        w="100%"
        as={RenderHTML}
      />
      <EditableTextarea
        name={id}
        type={type}
        options={selectOptions}
        py={2}
        px={2}
        as={InputFactory}
        rows={10}
        overflowY="auto"
        formProps={register(id)}
      />
      <EditableControls />
      <ShowUnderline />
    </Editable>
  );
};
