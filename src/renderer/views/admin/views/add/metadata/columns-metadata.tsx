import { FC, useContext, useEffect, useMemo } from 'react';
import {
  ViewRO,
  MetadataColumnDocsRO,
  ColumnRO,
} from 'renderer/defenitions/record-object';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { HStack, Button, Icon, Box, Grid } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { ViewSelectors } from 'renderer/store/selectors';
import { ColumnsReducer } from 'renderer/store/reducers';
import * as R from 'ramda';
import { ViewScopedContext } from 'renderer/contexts';
import { ColumnMetadataCard } from './components/column-metadata-card';

type ColumnsMetadataProperties = {
};

type FormData = {
  metadata: MetadataColumnDocsRO[];
};

export const ColumnsMetadata: FC<ColumnsMetadataProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();

  const formContext = useForm<FormData>({
    defaultValues: {
      metadata: viewState.columns.map((item) => ({ ...item.metadata , columnId: item.id })),
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  useEffect(() => {
    formContext.reset({
      metadata: viewState.columns.map((item) => ({ ...item.metadata, columnId: item.id })),
    });
    console.log("ipdated", viewState.columns.map((item) => ({ ...item.metadata, columnId: item.id })));
  }, [viewState]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  const { fields } = useFieldArray({ control, name: 'metadata' });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      ColumnsReducer.actions.upsertMany(
        data.metadata.map((item) =>
          R.mergeDeepRight<ColumnRO>(
            viewState.columns.find(
              (value: ColumnRO) => value.id === item.columnId
            ),
            {
              metadata: { title: item.title, description: item.description, category: item.category },
            }
          )
        )
      )
    );
  };

  return (
    <Box px={5} pb={0} pt={3}>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(1, 1fr)" gap={6}>
            {fields.map((data, index) => (
              <ColumnMetadataCard
                key={data.columnId}
                fieldIndex={index}
                columnId={data.columnId}
              />
            ))}
          </Grid>
          <Box pt={8}>
            <HStack justifyContent="space-between">
              <Button
                type="submit"
                variant="brand"
                size="lg"
                isDisabled={!isValid}
              >
                <Icon mr={2} as={MdSave} />
                Save
              </Button>
            </HStack>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};
