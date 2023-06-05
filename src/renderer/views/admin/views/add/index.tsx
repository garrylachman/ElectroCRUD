/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import { omit } from 'underscore';
import { useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@electrocrud/feedback';
import { ConfirmPromiseSaveModal } from 'renderer/components/modals/confirm-promise-save-modal';
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
import { SaveButton } from '@electrocrud/buttons';

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
  const { viewState, hasPrimaryKey } = useContext(ViewScopedContext);
  const sessionState = useAppSelector((state) => state.session);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCreateOrUpdate = (data: ViewRO) => {
    ConfirmPromiseSaveModal({ entityName: data.name || data.table })
      .then((value) => {
        if (value && viewState?.id) {
          const response = dispatch(
            ViewsReducer.actions.updateOne({ ...viewState, ...data })
          );
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
    defaultValues: omit(viewState, [
      'id',
      'creationDate',
      'modificationDate',
      'accountId',
      'columns',
    ]),
  });
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  useEffect(() => {
    reset(
      omit(viewState, [
        'id',
        'creationDate',
        'modificationDate',
        'accountId',
        'columns',
      ])
    );
  }, [viewState]);

  if (!sessionState.isConnected) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box height="-webkit-fill-available" width="100%">
      {viewState?.id === undefined && (
        <>
          <ViewsInfoAlert />
          <Spacer p={3} />
        </>
      )}
      <FormProvider {...formContext}>
        {viewState && viewState.id && (
          <form onSubmit={handleSubmit(handleCreateOrUpdate)}>
            <BasicDetailsCard isEditMode={viewState?.id !== undefined} />
            <Spacer p={3} />
            <>
              <TableColumnsCard viewId={viewState?.id} />
              <Spacer p={3} />
              {!hasPrimaryKey && (
                <>
                  <Alert
                    status="warning"
                    title="Primary key is missing"
                    description="In order to do use Modify operations (Create / Update /
                      Delete) a primary column must be definded."
                  />
                  <Spacer p={3} />
                </>
              )}
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px' }}>
                <TerminologyCard />
                <PermissionsCard
                  key={`permissions-${viewState?.id || ''}`}
                  canModify={hasPrimaryKey}
                />
              </SimpleGrid>
              <Spacer p={3} />
            </>

            <HStack justifyContent="space-between">
              <SaveButton type="submit" isDisabled={!isValid} />
            </HStack>
          </form>
        )}
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
