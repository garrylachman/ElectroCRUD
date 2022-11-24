import {
  EditablePreview,
  Box,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  EditableInput,
  Icon,
  Flex,
  InputProps,
  Textarea,
  EditableTextarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  keyframes,
} from '@chakra-ui/react';
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
  OptionsOrGroups,
} from 'chakra-react-select';
import _ from 'lodash';
import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import {
  useFormContext,
  useController,
  Controller,
  Control,
} from 'react-hook-form';
import { MdOutlineCheck, MdClose, MdEdit } from 'react-icons/md';

class ChangeEvent extends EventTarget {
  private secretValue: { name: string; value: string };

  constructor(name: string, value: string) {
    super();
    this.secretValue = { name, value };
  }

  get target() {
    return this.secretValue;
  }

  get currentTarget() {
    return this.secretValue;
  }
}

const ReactSelect: FC<
  InputProps & { options: OptionsOrGroups; control: Control }
> = ({ options, ...props }) => (
  <Controller
    {...props}
    render={({ field: { name } }) => (
      <Box hidden={props.hidden}>
        <Select
          name={name}
          ref={props.ref}
          onBlur={props.onBlur}
          options={options}
          value={options.find((c) => c.value === props.value)}
          onChange={(option) => {
            props.onChange(new ChangeEvent(name, option.value));
          }}
        />
      </Box>
    )}
  />
);

export type InlineEditFieldProps = {
  id: string;
  extra?: JSX.Element;
  placeholder?: string;
  type?: string;
  size?: string;
  isRequired?: boolean;
  helpText?: string;
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

const InputFactory = (props: any) => {
  const { formProps, ...rest } = props;
  switch (rest.type) {
    case 'textarea':
      return <EditableTextarea {...rest} {...formProps} />;
    case 'dropdown':
      return (
        <ReactSelect
          {...rest}
          {...formProps}
          onChange={(...args: any[]) => {
            rest.onChange(...args);
            formProps.onChange(...args);
          }}
        />
      );
    default:
      return <EditableInput {...rest} {...formProps} />;
  }
};

export const InlineEditField: FC<PropsWithChildren<InlineEditFieldProps>> = ({
  id,
  placeholder,
  type = 'text',
  fontSize = 'md',
  selectOptions = [],
}) => {
  const formContext = useFormContext();
  const bg = useColorModeValue('gray.200', 'gray.700');
  const fade = keyframes`
  from { background: ${bg} }
  to { background: white }
`;
  const animation = `${fade} infinite 2s cubic-bezier(0.1, -0.6, 0.2, 0)`;

  const formProps = useMemo(() => {
    return formContext.register(id);
  }, [formContext.register, id]);

  return (
    <Editable
      defaultValue={formContext.getValues(id)}
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
          as={(props) => {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: props.children?.toString()?.split('\n').join('<br/>'),
                }}
                {..._.omit(props, ['children'])}
              />
            );
          }}
        />
      </Tooltip>
      <EditableTextarea
        type={type}
        options={selectOptions}
        py={2}
        px={0}
        as={InputFactory}
        rows={10}
        overflowY="auto"
        formProps={formProps}
      />
      <EditableControls />
    </Editable>
  );
};
