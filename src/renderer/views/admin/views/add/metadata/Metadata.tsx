import { FC } from 'react';
import {
  ViewRO,
  MetadataTableDocsRO,
} from 'renderer/defenitions/record-object';
import { useForm, FormProvider } from 'react-hook-form';
import { HStack, Button, Icon, Spacer, Box } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { MdSave } from 'react-icons/md';
import { NestedPartial } from 'shared';
import { TableDocCard } from './components/TableDocCard';

type MetadataProps = {
  viewState: NestedPartial<ViewRO>;
};

type FormData = MetadataTableDocsRO;

export const Metadata: FC<MetadataProps> = ({ viewState }) => {
  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      tableDocs: {
        title: undefined,
        description: undefined,
        category: undefined,
        contact: { name: undefined, phone: undefined, email: undefined, details: undefined},
        ...viewState.metadata?.tableDocs,
      },
    },
  });

  return (
    <Box px={5} pb={0} pt={3}>
      <FormProvider {...formContext}>
        <form>
          <TableDocCard />
          <Spacer p={3} />
          <Box>
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
            </HStack>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};
