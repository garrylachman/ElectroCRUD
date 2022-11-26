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
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CodeExampleRO, ViewRO } from 'renderer/defenitions/record-object';
import { useForm, FormProvider } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Card from 'renderer/components/card/Card';
import { InlineEditField, InputField } from 'renderer/components/fields';
import { Categories } from 'renderer/defenitions/record-object/categories.def';
import _ from 'lodash';
import { SubCard } from 'renderer/containers/cards';
import { MdSave, MdDelete } from 'react-icons/md';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sql } from '@codemirror/lang-sql';
import { useAppDispatch } from 'renderer/store/hooks';
import { CodeExamplesReducer } from 'renderer/store/reducers';
import ReactTimeAgo from 'react-time-ago';

type CodeExampleItemProps = {
  initialValue: Partial<CodeExampleRO>;
};

type FormData = Omit<CodeExampleRO, 'id' | 'creationDate' | 'modificationDate'>;

export const CodeExampleItem: FC<CodeExampleItemProps> = ({ initialValue }) => {
  const dispatcher = useAppDispatch();
  const ref = useRef();
  const formContext = useForm<FormData>({
    defaultValues: initialValue,
  });

  const onSubmit = useCallback(
    (data) => {
      const code = ref.current?.view?.state?.sliceDoc();
      dispatcher(
        CodeExamplesReducer.actions.upsertOne({
          ...initialValue,
          ...data,
          code,
        })
      );
    },
    [initialValue, dispatcher]
  );

  const onDelete = useCallback(
    (data) => {
      if (initialValue.id !== undefined) {
        dispatcher(CodeExamplesReducer.actions.removeOne(initialValue.id));
      }
    },
    [initialValue, dispatcher]
  );

  return (
    <SubCard>
      <FormProvider {...formContext}>
        <form onSubmit={formContext.handleSubmit(onSubmit)}>
          <VStack display="block">
            <InlineEditField id="title" placeholder="Code Example Title" />
            <InlineEditField
              type="textarea"
              id="description"
              placeholder="Please describe about your code/example..."
            />
            <CodeMirror
              ref={ref}
              value={initialValue.code}
              extensions={[sql()]}
              theme={vscodeDark}
              height="200px"
            />
            <Flex justifyContent="space-between">
              <HStack>
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  isDisabled={!formContext.formState.isValid}
                >
                  <Icon mr={2} as={MdSave} />
                  Save
                </Button>
                <Button
                  type="button"
                  variant="solid"
                  colorScheme="red"
                  size="lg"
                  onClick={onDelete}
                  isDisabled={initialValue.id === undefined}
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
            </Flex>
          </VStack>
        </form>
      </FormProvider>
    </SubCard>
  );
};
