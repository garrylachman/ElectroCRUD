import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  SlideFade,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  useEditableControls,
  VStack,
} from '@chakra-ui/react';
import { sql } from '@codemirror/lang-sql';
import { joiResolver } from '@hookform/resolvers/joi';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { AnimatePresence, motion } from 'framer-motion';
import * as Joi from 'joi';
import _ from 'lodash';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSave,
} from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { InlineEditField, InputField } from 'renderer/components/fields';
import {
  ConfirmPromiseDeleteModal,
} from 'renderer/components/modals/confirm-promise-delete-modal';
import { SubCard } from 'renderer/containers/cards';
import { CodeExampleRO, ViewRO } from 'renderer/defenitions/record-object';
import {
  Categories,
} from 'renderer/defenitions/record-object/categories.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { CodeExamplesReducer } from 'renderer/store/reducers';

type CodeExampleItemProperties = {
  initialValue: Partial<CodeExampleRO>;
  index: number;
  onSave?: () => void;
};

type FormData = Omit<CodeExampleRO, 'id' | 'creationDate' | 'modificationDate'>;

export const CodeExampleItem: FC<CodeExampleItemProperties> = ({
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
        ConfirmPromiseDeleteModal({
          entityName: initialValue.title,
        })
          .then(() => {
            dispatcher(CodeExamplesReducer.actions.removeOne(initialValue.id));
            return true;
          })
          .catch(() => {});
      }
    },
    [initialValue, dispatcher]
  );

  const [isOpen, { on, off, toggle }] = useBoolean(
    initialValue.id === undefined
  );

  return (
    <motion.div
      layout
      initial={{ scaleY: 0.2, position: 'relative', opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0.2, opacity: 0 }}
      transition={{ duration: 1, bounce: 0.8, type: 'spring' }}
    >
      <Card variant="outline">
        <FormProvider {...formContext}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader pt={0} mx={2} my={4}>
                <Flex padding={0} pt={0}>
                <Flex flex="1" gap="0" alignItems="center" flexWrap="wrap">
                  <Box display="flex" flexDirection="column">
                    <Heading size="md" p={0}>{initialValue.title}</Heading>
                    {!initialValue.title && (
                      <Text
                        alignItems="center"
                        display="flex"
                        as="kbd"
                        fontSize="sm"
                      >
                        {index > 0 ? `Example #${index}` : `New`}
                      </Text>
                    )}
                  </Box>
                </Flex>
                <IconButton
                  size="sm"
                  aria-label="Open / Close"
                  colorScheme="blackAlpha"
                  variant="solid"
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
            </CardHeader>

            <Divider />

            <Collapse
              in={isOpen}
              animateOpacity
              style={{ overflow: 'initial' }}
            >
              <CardBody pb={0}>
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
                    style={{
                      paddingTop: '10px',
                    }}
                  />
                </VStack>
              </CardBody>
              <CardFooter justifyContent="space-between">
                <HStack>
                  <RippleButton
                    type="submit"
                    bgColorScheme="primary"
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
    </motion.div>
  );
};
