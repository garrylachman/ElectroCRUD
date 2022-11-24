import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  HStack,
  Button,
  Icon,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ColumnRO, ViewRO } from 'renderer/defenitions/record-object';
import { useCountdown } from 'usehooks-ts';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  NestedPartial,
  TablesListResponse,
  TableInfoResponse,
  TableInfoRow,
} from 'shared';
import _, { omit } from 'lodash';
import { useIPCTableInfo, useIPCTablesList } from 'renderer/ipc';
import { IPCChannelEnum } from 'shared/enums/ipc.enum';
import { useForm, FormProvider } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { MdSave, MdClear } from 'react-icons/md';
import Card from 'renderer/components/card/Card';
import { ViewsReducer } from 'renderer/store/reducers';
import {
  useParams,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';
import { BasicDetailsCard } from './components/BasicDetailsCard';
import { ViewsInfoAlert } from './components/ViewsInfoAlert';
import { TableColumnsCard } from './components/TableColumnsCard';
import { TerminologyCard } from './components/TerminologyCard';
import { PermissionsCard } from './components/PermissionsCard';

type FormData = Omit<ViewRO, 'id' | 'creationDate' | 'modificationDate'>;

const validationSchema = Joi.object<FormData>({
  name: Joi.string().min(3).max(30).required(),
  table: Joi.string().min(1).max(128).required(),
  terminology: Joi.object({
    plural: Joi.string().min(3).max(30).required(),
    singular: Joi.string().min(3).max(30).required(),
  }),
  permissions: Joi.object({
    create: Joi.boolean(),
    read: Joi.boolean(),
    update: Joi.boolean(),
    delete: Joi.boolean(),
  }),
});

const AddOrEditView = ({
  initialState,
}: {
  initialState: NestedPartial<ViewRO>;
}) => {
  const sessionState = useAppSelector((state) => state.session);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const dispatch = useAppDispatch();
  const [state, setState] = useState<NestedPartial<ViewRO>>(initialState);

  const [tables, setTables] = useState<string[]>([]);

  const handleCreateOrUpdate = (data: NestedPartial<ViewRO>) => {
    console.log('handleCreateOrUpdate', state, state.id);
    if (state.id) {
      const res = dispatch(
        ViewsReducer.actions.updateOne({ ...state, ...data })
      );
      console.log('res', res);
      if (res && res.payload) {
        setState((prev) => ({ ...prev, ...res.payload.changes }));
      }
    } else {
      const res = dispatch(ViewsReducer.actions.addOne({ ...state, ...data }));
      if (res && res.payload) {
        setState((prev) => ({ ...prev, id: res.payload.id }));
        setTimeout(() => {
          navigate(`../${res.payload.id}`);
        }, 1000);
      }
    }
  };

  const formContext = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: _.omit(state, [
      'id',
      'creationDate',
      'modificationDate',
      'accountId',
      'columns',
    ]),
  });

  useEffect(() => {
    console.log('state effect', revalidator.state);
    console.log('initialState', initialState);
    formContext.reset(
      _.omit(initialState, [
        'id',
        'creationDate',
        'modificationDate',
        'accountId',
        'columns',
      ])
    );
    if (initialState.columns !== undefined) {
      setState((prev) => ({ ...prev, columns: initialState.columns }));
    }
    console.log(formContext.formState);
  }, [initialState]);

  /* useEffect(() => {
    console.log('state effect - initialState');
    formContext.reset();
    formContext.reset({});
    console.log(formContext.formState);
    setState(initialState);
  }, [initialState]); */

  const {
    result: tablesResult,
    execute: tablesExecute,
    isLoading: tablesIsLoading,
  } = useIPCTablesList({
    channel: IPCChannelEnum.TABLES_LIST,
  });

  const {
    result: infoResult,
    execute: infoExecute,
    isLoading: infoIsLoading,
  } = useIPCTableInfo({
    channel: IPCChannelEnum.TABLE_INFO,
    body: formContext.getValues('table'),
  });

  const { table } = formContext.getValues();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('table', table);
    if (table === undefined || table === '') return;
    if (isLoading) return;
    console.log('table found');
    infoExecute();
    if (state.id === undefined) {
      formContext.setValue('terminology.plural', `${table}s`, {
        shouldDirty: true,
      });
      formContext.setValue('terminology.singular', table, {
        shouldDirty: true,
      });
    }
  }, [table]);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 3,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (infoIsLoading) {
      setIsLoading(true);
      startCountdown();
    }
  }, [infoIsLoading]);

  useEffect(() => {
    if (count === 0) {
      setIsLoading(false);
      resetCountdown();
      stopCountdown();
    }
  }, [count]);

  useEffect(() => {
    if (infoResult && (infoResult as TableInfoResponse).body) {
      setState((prev) => ({
        ...prev,
        columns: (infoResult as TableInfoResponse).body.map<ColumnRO>((row) => {
          const eRow = _.find<ColumnRO>(prev.columns as ColumnRO[], {
            name: row.name,
          });
          return {
            ...row,
            enabled: eRow?.enabled !== undefined ? eRow?.enabled : true,
            searchable: eRow?.searchable !== undefined ? eRow?.searchable : true,
          };
        }),
      }));
    }
  }, [infoResult]);

  useEffect(() => {
    if (tablesResult && (tablesResult as TablesListResponse).body) {
      setTables((tablesResult as TablesListResponse).body);
    }
  }, [tablesResult]);

  useEffect(() => {
    if (sessionState.isConnected) {
      tablesExecute();
    }
  }, [sessionState]);

  const onUpdate = useCallback(
    (data: NestedPartial<ViewRO>) => {
      console.log('update', state, data);
      setState((prev) => ({ ...prev, ...data }));
    },
    [setState, state]
  );

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '60px' }}>
      <ViewsInfoAlert />
      <Spacer p={3} />
      <FormProvider {...formContext}>
        <form onSubmit={formContext.handleSubmit(handleCreateOrUpdate)}>
          <BasicDetailsCard
            tables={tables}
            isEditMode={state.id !== undefined}
          />
          <Spacer p={3} />

          {table && state.columns && state.columns.length > 0 && (
            <>
              <TableColumnsCard
                initialState={state.columns as ColumnRO[]}
                update={(data) => onUpdate({ columns: data })}
                table={table}
                isLoaded={!isLoading}
              />
              <Spacer p={3} />
            </>
          )}

          {state.columns && state.columns.length > 0 && !isLoading && (
            <>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px' }}>
                <TerminologyCard />
                <PermissionsCard />
              </SimpleGrid>
              <Spacer p={3} />
            </>
          )}

          <Card>
            <HStack justifyContent="space-between">
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
                variant="solid"
                colorScheme="red"
                size="lg"
                onClick={() => formContext.reset()}
                isDisabled={state.id !== undefined}
              >
                <Icon mr={2} as={MdClear} />
                Reset
              </Button>
            </HStack>
          </Card>
        </form>
      </FormProvider>
    </Box>
  );
};

export const Edit = () => {
  const params = useParams();
  const sessionState = useAppSelector((state) => state.session);
  const loaderData = useLoaderData() as NestedPartial<ViewRO>;

  useEffect(
    () => console.log('edit', loaderData.id, params.viewId),
    [loaderData]
  );

  // console.log('edit', loaderData.id, params.viewId);

  return (
    <AddOrEditView
      initialState={{
        accountId: sessionState.account?.id,
        ...loaderData,
      }}
    />
  );
};

export const AddNew = () => {
  const sessionState = useAppSelector((state) => state.session);

  return (
    <AddOrEditView
      initialState={{
        accountId: sessionState.account?.id,
      }}
    />
  );
};
