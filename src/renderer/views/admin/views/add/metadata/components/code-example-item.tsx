import {
  Grid,
  Badge,
  Button,
  Flex,
  Icon,
  GridItem,
  VStack,
  Heading,
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
  Text,
  EditableInput,
  Alert,
  AlertDescription,
  AlertTitle,
  Collapse,
  Divider,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useBoolean,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CodeExampleRO, ViewRO } from 'renderer/defenitions/record-object';
import { useForm, FormProvider } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { InlineEditField, InputField } from 'renderer/components/fields';
import { Categories } from 'renderer/defenitions/record-object/categories.def';
import _ from 'lodash';
import { SubCard } from 'renderer/containers/cards';
import {
  MdSave,
  MdDelete,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sql } from '@codemirror/lang-sql';
import { useAppDispatch } from 'renderer/store/hooks';
import { CodeExamplesReducer } from 'renderer/store/reducers';
import ReactTimeAgo from 'react-time-ago';
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { motion } from 'framer-motion';
import { useVisibleAnimation} from 'framer-motion-visible';

type CodeExampleItemProperties = {
  initialValue: Partial<CodeExampleRO>;
  index: number;
  onSave?: () => void;
};

type FormData = Omit<CodeExampleRO, 'id' | 'creationDate' | 'modificationDate'>;

const CodeExampleItem: FC<CodeExampleItemProperties> = ({
  initialValue,
  index,
  onSave,
}) => {
  const dispatcher = useAppDispatch();
  const reference = useRef();
  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: initialValue,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, dirtyFields },
  } = formContext;

  useEffect(() => {
    reset(initialValue);
  }, [initialValue]);

  const onSubmit = (data) => {
    const code = reference.current?.view?.state?.sliceDoc();
    dispatcher(
      CodeExamplesReducer.actions.upsertOne({
        ...initialValue,
        ...data,
        code,
      })
    );
    if (onSave) {
      onSave();
    }
  };

  const onDelete = useCallback(
    (data) => {
      if (initialValue.id !== undefined) {
        dispatcher(CodeExamplesReducer.actions.removeOne(initialValue.id));
      }
    },
    [initialValue, dispatcher]
  );

  const [isOpen, { on, off, toggle }] = useBoolean(
    initialValue.id === undefined
  );

  return (
    <Card>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeaderBetter isTopBorder={isOpen}>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Box display="flex" flexDirection="column">
                  <Heading size="md">{initialValue.title}</Heading>
                  <Text
                    alignItems="center"
                    display="flex"
                    as="kbd"
                    fontSize="sm"
                  >
                    {index > 0 ? `Example #${index}` : `New`}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                size="sm"
                aria-label="Open / Close"
                colorScheme="brand"
                variant={isOpen ? 'outline' : 'solid'}
                icon={
                  isOpen ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdKeyboardArrowDown size={20} />
                  )
                }
                onClick={toggle}
              />
            </Flex>
          </CardHeaderBetter>

          <Divider />

          <Collapse in={isOpen} animateOpacity style={{ overflow: 'initial' }}>
            <CardBody>
              <VStack display="block">
                <InlineEditField
                  type="input"
                  id="title"
                  placeholder="Code Example Title"
                />
                <InlineEditField
                  type="textarea"
                  id="description"
                  placeholder="Please describe about your code/example..."
                />
                <CodeMirror
                  ref={reference}
                  value={initialValue.code}
                  extensions={[sql()]}
                  theme={vscodeDark}
                  height="200px"
                />
              </VStack>
            </CardBody>
            <CardFooter justifyContent="space-between">
              <HStack>
                <RippleButton
                  type="submit"
                  variant="brand"
                  size="lg"
                  isDisabled={!isValid}
                >
                  <Icon mr={2} as={MdSave} />
                  Save
                </RippleButton>
                <Button
                  type="button"
                  variant="solid"
                  colorScheme="red"
                  size="lg"
                  onClick={onDelete}
                  hidden={initialValue.id === undefined}
                >
                  <Icon mr={2} as={MdDelete} />
                  Delete
                </Button>
              </HStack>
              <HStack>
                <Stat size="xs" w="180px">
                  <StatLabel fontSize="sm" align="right">
                    Created at
                  </StatLabel>
                  <StatNumber align="right">
                    {initialValue.creationDate ? (
                      <ReactTimeAgo date={initialValue.creationDate} />
                    ) : (
                      'N/A'
                    )}
                  </StatNumber>
                </Stat>
                <Stat size="xs" w="180px">
                  <StatLabel fontSize="sm" align="right">
                    Last updated at
                  </StatLabel>
                  <StatNumber align="right">
                    {initialValue.modificationDate ? (
                      <ReactTimeAgo date={initialValue.modificationDate} />
                    ) : (
                      'N/A'
                    )}
                  </StatNumber>
                </Stat>
              </HStack>
            </CardFooter>
          </Collapse>
        </form>
      </FormProvider>
    </Card>
  );
};

function AnimateComponent({ children }) {
  const visibleAnimation = useVisibleAnimation({
    initial: { x: 0, y: -100, opacity: 0, width: '100%' },
    visible: { x: 0, y: 0, opacity: 1 },
  });

  return <motion.div {...visibleAnimation}>{children}</motion.div>;
}

export const CodeExampleItemComponent = (properties) => (
  <AnimateComponent>
    <CodeExampleItem {...properties} />
  </AnimateComponent>
);
