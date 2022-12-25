import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatProps,
  Tag,
  Text,
} from '@chakra-ui/react';
import { isBoolean, isNil } from 'lodash';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdCheck, MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { SaveButton } from 'renderer/components/buttons/save-button';
import { InputField } from 'renderer/components/fields/input-field';
import { TagsAutocomplete } from 'renderer/components/fields/tags-autocomplete';
import {
  ConfirmPromiseSaveModal,
} from 'renderer/components/modals/confirm-promise-save-modal';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { TagType } from 'renderer/defenitions/record-object/tags.define';
import { ColumnRO } from 'renderer/defenitions/record-object/view.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ColumnSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

type TagsLineProperties = {
  columnState: ColumnRO;
};

const TagsLine: FC<TagsLineProperties> = ({ columnState }) =>
  useMemo(
    () => (
      <HStack
        py={0}
        shouldWrapChildren
        wrap="wrap"
        spacing={0}
        isInline
        justify="flex-start"
      >
        {[
          'data_type',
          'default_value',
          'foreign_key_column',
          'foreign_key_table',
          'is_nullable',
          'is_primary_key',
          'is_unique',
          'max_length',
          'searchable',
        ].map((key) => (
          <Fragment key={`tags-${key}-${columnState.id}`}>
            {!isNil(columnState[key]) && (
              <Badge
                variant="subtle"
                colorScheme="brand"
                size="sm"
                my={1}
                mr={2}
              >
                <Tag variant="subtle" fontSize={10} size="sm" mr={2}>
                  {key}
                </Tag>
                <Tag
                  variant="solid"
                  colorScheme={
                    isBoolean(columnState[key])
                      ? (columnState[key] === true
                        ? 'green'
                        : 'red')
                      : 'blackAlpha'
                  }
                  fontSize={10}
                  size="sm"
                >
                  {isBoolean(columnState[key]) ? (
                    <>
                      {columnState[key] && <Icon boxSize={3} as={MdCheck} />}
                      {!columnState[key] && <Icon boxSize={3} as={MdClose} />}
                    </>
                  ) : (
                    <>{String(columnState[key])}</>
                  )}
                </Tag>
              </Badge>
            )}
          </Fragment>
        ))}
      </HStack>
    ),
    [columnState]
  );

export const ColumnDetails = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);

  const columnState = useSelector<RootState, ColumnRO>(
    useCallback(
      memoize((state) =>
        ColumnSelectors.createColumnSelector(state)(memState.columnId)
      ),
      [memState]
    )
  );

  const formContext = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: R.pickAll(['enabled', 'searchable', 'alias'], columnState),
  });

  const { register, handleSubmit, reset, setValue } = formContext;

  const onSubmit = (data) => {
    ConfirmPromiseSaveModal({
      entityName: columnState.name,
    })
      .then(() => {
        dispatch(
          ColumnsReducer.actions.upsertOne({
            ...R.pickAll(['id', 'name'], columnState),
            ...R.pickAll(['enabled', 'searchable', 'alias'], data),
          })
        );
        return true;
      })
      .catch(() => {});
  };

  useEffect(() => {
    const data = R.mergeRight(
      R.pickAll(['enabled', 'searchable', 'alias'], columnState),
      { alias: R.propOr('', 'alias', columnState) }
    );
    reset(data);
    // reset({searchable: true});
  }, [columnState]);

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="brand.200" />
      </Center>
    );
  }

  return (
    <Box px={4} key={`columndetails--${columnState.id}`}>
      <FormProvider {...formContext}>
        <Box>
          <Heading size="md">{columnState.name}</Heading>

          <HStack py={2}>
            <Box flex={1}>
              <Text as="span" mr={2} fontWeight="semibold">
                Created at
              </Text>
              {columnState.creationDate ? (
                <ReactTimeAgo date={columnState.creationDate} />
              ) : (
                <Text>N/A</Text>
              )}
            </Box>
            <Box flex={1}>
              <Text as="span" mr={2} fontWeight="semibold">
                Last updated at
              </Text>
              {columnState.modificationDate ? (
                <ReactTimeAgo date={columnState.modificationDate} />
              ) : (
                <Text>N/A</Text>
              )}
            </Box>
          </HStack>

          <TagsLine columnState={columnState} />

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
            defaultValue={[...columnState.metadata.tags]}
          />
        </Box>

        <Box py={4}>
          <SaveButton onClick={handleSubmit(onSubmit)} />
        </Box>
      </FormProvider>
    </Box>
  );
};
