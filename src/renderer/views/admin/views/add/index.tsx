import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  HStack,
  Button,
  Icon,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ViewRO } from 'renderer/defenitions/record-object';
import { useEffect, useState, useCallback, memo, useContext } from 'react';
import { NestedPartial } from 'shared';
import _ from 'lodash';
import { useForm, FormProvider } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { MdSave, MdClear, MdOutlineCollections } from 'react-icons/md';
import Card from 'renderer/components/card/Card';
import { ViewsReducer } from 'renderer/store/reducers';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import store from 'renderer/store/store';
import { useSelector } from 'react-redux';
import { ViewSelectors } from 'renderer/store/selectors';
import {
  ViewScopedContext,
  ViewScopedContextProvider,
} from 'renderer/contexts';
import { AnimatePresence, motion } from 'framer-motion';
import { BasicDetailsCard } from './components/BasicDetailsCard';
import { ViewsInfoAlert } from './components/ViewsInfoAlert';
import { TableColumnsCard } from './components/TableColumnsCard';
import { TerminologyCard } from './components/terminology-card';
import { PermissionsCard } from './components/permissions-card';
import { TabsHeader } from './tabs-header';
import { MetadataIndex } from './metadata';

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

const AddOrEditView = () => {
  const { viewState } = useContext(ViewScopedContext);
  const sessionState = useAppSelector((state) => state.session);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCreateOrUpdate = (data: ViewRO) => {
    console.log('handleCreateOrUpdate', viewState, viewState.id);
    if (viewState.id) {
      const response = dispatch(
        ViewsReducer.actions.updateOne({ ...viewState, ...data })
      );
      console.log('response', response);
    } else {
      const response = dispatch(
        ViewsReducer.actions.addOne({ ...viewState, ...data })
      );
      if (response && response.payload && response.payload.id) {
        navigate(`../${response.payload.id}/edit`);
      }
    }
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
    <Box pt={viewState.id === undefined ? '80px' : '10px'}>
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

          <Card>
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

export const EditView = () => {
  const { viewId } = useParams();

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ right: '-1000px', position: 'relative', opacity: 0 }}
        animate={{ right: '0px', opacity: 1 }}
        exit={{ right: '-1000px', opacity: 0 }}
      >
        <ViewScopedContextProvider viewId={viewId}>
          <Spacer pt="60px" /> <TabsHeader />
          <Tabs isLazy colorScheme="brandTabs" pt="10px">
            <TabList>
              <Tab>
                <Flex align="center">
                  <Icon as={MdOutlineCollections} w="20px" h="20px" me="8px" />
                  <Text fontSize="lg" fontWeight="500">
                    Dataset
                  </Text>
                </Flex>
              </Tab>
              <Tab>
                <Flex align="center">
                  <Icon as={MdOutlineCollections} w="20px" h="20px" me="8px" />
                  <Text fontSize="lg" fontWeight="500">
                    Metadata
                  </Text>
                </Flex>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0} pb={0}>
                <AddOrEditView />
              </TabPanel>
              <TabPanel px={0} pb={0}>
                <MetadataIndex />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ViewScopedContextProvider>
      </motion.div>
    </AnimatePresence>
  );
};

export const AddNew = () => {
  return (
    <ViewScopedContextProvider>
      <AddOrEditView />
    </ViewScopedContextProvider>
  );
};
