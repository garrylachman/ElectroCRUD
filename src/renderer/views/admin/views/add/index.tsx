import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdClear, MdSave } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Card from 'renderer/components/card/Card';
import {
  ConfirmPromiseSaveModal,
} from 'renderer/components/modals/confirm-promise-save-modal';
import {
  ViewScopedContext,
  ViewScopedContextProvider,
} from 'renderer/contexts';
import { ViewRO } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';

import { BasicDetailsCard } from './components/basic-details-card';
import { PermissionsCard } from './components/permissions-card';
import { TableColumnsCard } from './components/table-columns-card';
import { TerminologyCard } from './components/terminology-card';
import { ViewsInfoAlert } from './components/views-info-alert';

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
  metadata: Joi.object().optional(),
});

export const AddOrEditView = () => {
  const { viewState } = useContext(ViewScopedContext);
  const sessionState = useAppSelector((state) => state.session);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCreateOrUpdate = (data: ViewRO) => {
    console.log('handleCreateOrUpdate', viewState, viewState.id);

    ConfirmPromiseSaveModal({ entityName: data.name || data.table })
      .then((value) => {
        if (value && viewState?.id) {
          const response = dispatch(
            ViewsReducer.actions.updateOne({ ...viewState, ...data })
          );
          console.log('response', response);
        } else {
          const response = dispatch(
            ViewsReducer.actions.addOne({ ...viewState, ...data })
          );
          if (response && response.payload && response.payload.id) {
            navigate(`../${response?.payload?.id}/edit`);
          }
        }
        return true;
      })
      .catch(() => {});
  };

  const formContext = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: _.omit(viewState, [
      'id',
      'creationDate',
      'modificationDate',
      'accountId',
      'columns',
    ]),
  });
  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  useEffect(() => {
    console.log('initialState', viewState);
    reset(
      _.omit(viewState, [
        'id',
        'creationDate',
        'modificationDate',
        'accountId',
        'columns',
      ])
    );
    console.log(formContext);
  }, [viewState]);

  if (!sessionState.isConnected) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box overflow="scroll" paddingRight={2} height="-webkit-fill-available">
      {viewState.id === undefined && (
        <>
          <ViewsInfoAlert />
          <Spacer p={3} />
        </>
      )}
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(handleCreateOrUpdate)}>
          <BasicDetailsCard isEditMode={viewState.id !== undefined} />
          <Spacer p={3} />

          {viewState.id && (
            <>
              <TableColumnsCard viewId={viewState.id} />
              <Spacer p={3} />
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px' }}>
                <TerminologyCard />
                <PermissionsCard />
              </SimpleGrid>
              <Spacer p={3} />
            </>
          )}

          <Card variant="outline">
            <HStack justifyContent="space-between">
              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                size="lg"
                isDisabled={!isValid}
              >
                <Icon mr={2} as={MdSave} />
                Save
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                size="lg"
                onClick={() => reset()}
                isDisabled={viewState.id !== undefined}
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

export const AddNew = () => {
  return (
    <ViewScopedContextProvider>
      <AddOrEditView />
    </ViewScopedContextProvider>
  );
};
