import { FC, useEffect } from 'react';
import {
  ViewRO,
  MetadataTableDocsRO,
  TagType,
} from 'renderer/defenitions/record-object';
import { useForm, FormProvider } from 'react-hook-form';
import { HStack, Button, Icon, Spacer, Box } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { NestedPartial } from 'shared';
import { useAppDispatch } from 'renderer/store/hooks';
import { TagsReducer, ViewsReducer } from 'renderer/store/reducers';
import { TableDocCard } from './components/TableDocCard';

type MetadataProps = {
  viewState: NestedPartial<ViewRO>;
};

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

export const Metadata: FC<MetadataProps> = ({ viewState }) => {
  const dispatch = useAppDispatch();
  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      ...viewState.metadata?.tableDocs,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  useEffect(() => {
    console.log("reset", viewState.metadata?.tableDocs);
    reset({
      ...defaultValues,
      ...viewState.metadata?.tableDocs,
    });
  }, [reset, viewState]);

  /*const onSubmit = (data: FormData) =>
    dispatch(
      ViewsReducer.actions.updateOne({
        id: viewState.id,
        name: viewState.name,
        metadata: { tableDocs: { ...data } },
      })
    );*/

  const onSubmit = (data: FormData) =>
    dispatch(
      TagsReducer.actions.upsertOneTable({
        label: 'test',
        type: TagType.TABLE,
      }, viewState.id)
    );

  return (
    <Box px={5} pb={0} pt={3}>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TableDocCard />
          <Spacer p={3} />
          <Box>
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
