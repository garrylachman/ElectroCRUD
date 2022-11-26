import {
  EditablePreview,
  Box,
  useColorModeValue,
  IconButton,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
  Icon,
  Flex,
  InputProps,
  EditableTextarea,
  keyframes,
} from '@chakra-ui/react';
import { Select, OptionsOrGroups } from 'chakra-react-select';
import _ from 'lodash';
import react, { FC, forwardRef, PropsWithChildren } from 'react';
import { useFormContext, Controller, Control } from 'react-hook-form';
import { MdOutlineCheck, MdClose, MdEdit } from 'react-icons/md';

const ReactSelect: FC<
  InputProps & {
    options: OptionsOrGroups<any, any>;
    control: Control;
    hidden: boolean;
  }
> = forwardRef((props, ref) => {
  const { options, ...rest } = { ...props, ref };
  return (
    // @ts-ignore
    <Controller
      {...rest}
      render={({ field: { name, ref: inRef } }) => (
        <Box hidden={rest.hidden}>
          <Select
            name={name}
            ref={inRef}
            onBlur={rest.onBlur}
            options={options}
            value={options.find((c) => c.value === rest.value)}
            onChange={(option) => {
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

export type InlineEditFieldProps = {
  id: string;
  placeholder?: string;
  type?: string;
  fontSize?: string;
  selectOptions?: Record<string, string>[];
};

export const EditableControls: FC<any> = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton
        variant="brand"
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
        colorScheme="blackAlpha"
        icon={<Icon as={MdEdit} boxSize={3} />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

const InputFactory = forwardRef((props: any, ref) => {
  const { formProps, ...rest } = props;
  switch (rest.type) {
    case 'textarea':
      return <EditableTextarea {...rest} {...formProps} />;
    case 'dropdown':
      return (
        <ReactSelect
          {...rest}
          {...formProps}
          ref={ref}
          onChange={(...args: any[]) => {
            rest.onChange(...args);
            formProps.onChange(...args);
          }}
        />
      );
    default:
      return <EditableInput {...rest} {...formProps} />;
  }
});

export const RenderHTML: FC<PropsWithChildren> = ({ ...props }) => (
  <>
    {props.children && (
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: props.children?.toString()?.split('\n').join('<br/>'),
        }}
        {..._.omit(props, ['children'])}
      />
    )}
  </>
);

export const InlineEditField: FC<PropsWithChildren<InlineEditFieldProps>> = ({
  id,
  placeholder,
  type = 'text',
  fontSize = 'md',
  selectOptions = [],
}) => {
  const { register, watch } = useFormContext();
  const value = watch(id);
  const bg = useColorModeValue('gray.200', 'gray.700');
  const fade = keyframes`
  from { background: ${bg} }
  to { background: white }
`;
  const animation = `${fade} infinite 2s cubic-bezier(0.1, -0.6, 0.2, 0)`;

  return (
    <Editable
      defaultValue={value}
      value={value}
      isPreviewFocusable
      selectAllOnFocus={false}
      placeholder={placeholder}
      sx={{
        position: 'relative',
      }}
    >
      <Tooltip label="Click to edit">
        <EditablePreview
          py={2}
          px={0}
          fontSize={fontSize}
          w="100%"
          _hover={{
            background: useColorModeValue('gray.200', 'gray.700'),
            animation,
          }}
          as={RenderHTML}
        />
      </Tooltip>
      <EditableTextarea
        name={id}
        type={type}
        options={selectOptions}
        py={2}
        px={0}
        as={InputFactory}
        rows={10}
        overflowY="auto"
        formProps={register(id)}
      />
      <EditableControls />
    </Editable>
  );
};
