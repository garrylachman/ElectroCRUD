import {
  Box,
  Center,
  Checkbox,
  Code,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Property, PropertyList } from '@saas-ui/react';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { useCallback, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { SaveButton } from 'renderer/components/buttons/save-button';
import { TagsAutocomplete } from 'renderer/components/fields/tags-autocomplete';
import { ConfirmPromiseSaveModal } from 'renderer/components/modals/confirm-promise-save-modal';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { TagType } from 'renderer/defenitions/record-object/tags.define';
import {
  ColumnRO,
  StrictColumnRO,
} from 'renderer/defenitions/record-object/view.define';
import { usePolicy } from 'renderer/hooks';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ColumnSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

import { ColumnTagsLine } from './column-tag-line';

export const ColumnDetails = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);

  const columnState = useSelector<RootState, StrictColumnRO>(
    useCallback(
      memoize((state) =>
        ColumnSelectors.createColumnSelector(state)(memState.columnId)
      ),
      [memState]
    )
  );

  const exampleData = {
    [columnState.name]: 'Example Text',
  };
  const policy = usePolicy([columnState], [exampleData]);

  const formContext = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      ...R.pickAll(['enabled', 'searchable', 'alias', 'metadata'], columnState),
    },
  });

  const { register, handleSubmit, reset, setValue } = formContext;

  const onSubmit = (data: ColumnRO) => {
    ConfirmPromiseSaveModal({
      entityName: columnState.name,
    })
      .then(() => {
        dispatch(
          ColumnsReducer.actions.upsertOne({
            ...R.pickAll(['id', 'name'], columnState),
            ...R.pickAll<ColumnRO, ColumnRO>(
              ['enabled', 'searchable', 'alias'],
              data
            ),
          })
        );
        return true;
      })
      .catch(() => {});
  };

  useEffect(() => {
    const data: ColumnRO = R.mergeRight<ColumnRO, ColumnRO>(
      R.pickAll<ColumnRO, ColumnRO>(
        ['enabled', 'searchable', 'alias', 'metadata'],
        columnState
      ),
      { alias: R.propOr('', 'alias', columnState) }
    );
    reset(data);
    // reset({searchable: true});
  }, [columnState]);

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="primary.300" />
      </Center>
    );
  }

  return (
    <Box px={4} key={`columndetails--${columnState.id}`}>
      <FormProvider {...formContext}>
        <Box>
          <Heading size="md">{columnState.name}</Heading>

          <PropertyList display="flex" flex={1} gap={3}>
            <Property
              flexDirection="row"
              flex={1}
              label="Created at"
              value={<ReactTimeAgo date={columnState.creationDate} />}
            />
            <Property
              flexDirection="row"
              flex={1}
              label="Updated at"
              value={<ReactTimeAgo date={columnState.modificationDate} />}
            />
          </PropertyList>

          <ColumnTagsLine columnState={columnState} />

          <Divider py={2} />

          <Box py={4}>
            <FormControl>
              <FormLabel mb={1}>Column Alias</FormLabel>
              <FormHelperText>
                Use a friendly name as column name
              </FormHelperText>
              <Input
                placeholder="alias"
                variant="flushed"
                {...register('alias')}
              />
            </FormControl>
          </Box>

          <HStack py={2}>
            <Box display="flex" flexDirection="row" flex={1}>
              <Checkbox mr={3} size="lg" {...register('searchable')} />
              <Text>Searchable</Text>
            </Box>
            <Box display="flex" flexDirection="row" flex={1}>
              <Checkbox mr={3} size="lg" {...register('enabled')} />
              <Text>Enabled</Text>
            </Box>
          </HStack>

          <Divider py={2} />

          <Heading size="md" pt={4}>
            Tags
          </Heading>
          <Text>
            You can use tags to apply a polices, mark PII/PHI or just for
            describe the data
          </Text>
          <TagsAutocomplete
            size="md"
            id="metadata.tags"
            type={TagType.COLUMN}
            target={{ columnId: columnState.id }}
            defaultValue={[...(columnState.metadata?.tags || [])]}
          />

          {JSON.stringify(exampleData) !== JSON.stringify(policy[0]) && (
            <Box pt={4}>
              <Heading size="md">Applied Policy</Heading>
              <HStack pt={2}>
                <Flex flex={1} flexDirection="column">
                  <Text>Original:</Text>
                  <Code ml={2}>{JSON.stringify(exampleData)}</Code>
                </Flex>
                <Center height="50px" px={10}>
                  <Divider orientation="vertical" />
                </Center>
                <Flex flex={1} flexDirection="column">
                  <Text>Result:</Text>
                  <Code ml={2}>{JSON.stringify(policy[0])}</Code>
                </Flex>
              </HStack>
            </Box>
          )}
        </Box>

        <Box pt={4}>
          <SaveButton onClick={handleSubmit(onSubmit)} />
        </Box>
      </FormProvider>
    </Box>
  );
};
