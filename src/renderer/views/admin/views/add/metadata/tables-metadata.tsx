import { Box, Button, HStack, Icon, Spacer } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import {
  ConfirmPromiseSaveModal,
} from 'renderer/components/modals/confirm-promise-save-modal';
import { ViewScopedContext } from 'renderer/contexts';
import { MetadataTableDocsRO } from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';

import {
  TabeDocumentation,
  TabeDocumentation,
} from './components/table-document';
import { TableTagsCard } from './components/table-tags-card';

type TablesMetadataProperties = unknown;

type FormData = MetadataTableDocsRO;

const defaultValues = {
  title: undefined,
  description: undefined,
  category: undefined,
  contact: {
    name: undefined,
    phone: undefined,
    email: undefined,
    details: undefined,
  },
  tags: [],
};

export const TablesMetadata: FC<TablesMetadataProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();
  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      ...viewState.metadata,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  useEffect(() => {
    reset({
      ...defaultValues,
      ...viewState.metadata,
    });
  }, [reset, viewState]);

  const onSubmit = (data: FormData) =>
    ConfirmPromiseSaveModal({ entityName: viewState?.name })
      .then(() => {
        dispatch(
          ViewsReducer.actions.updateOne({
            ...viewState,
            metadata: { ...data },
          })
        );
        return true;
      })
      .catch(() => {});

  return (
    <Box px={5} pb={6}>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabeDocumentation />
          <Spacer p={3} />
          <TableTagsCard />
          <Spacer p={3} />
          <Box>
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
            </HStack>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};
