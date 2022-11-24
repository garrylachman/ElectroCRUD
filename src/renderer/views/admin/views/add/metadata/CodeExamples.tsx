import { FC, useMemo } from 'react';
import {
  ViewRO,
  MetadataTableDocsRO,
} from 'renderer/defenitions/record-object';
import { useForm, FormProvider } from 'react-hook-form';
import {
  HStack,
  Button,
  Icon,
  Spacer,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { MdSave } from 'react-icons/md';
import { NestedPartial } from 'shared';
import { useAppSelector } from 'renderer/store/hooks';
import { CodeExamplesReducer } from 'renderer/store/reducers';
import { TableDocCard } from './components/TableDocCard';
import { CodeExampleItem } from './components/CodeExampleItem';

type CodeExamplesProps = {
  viewState: NestedPartial<ViewRO>;
};

export const CodeExamples: FC<CodeExamplesProps> = ({ viewState }) => {
  const codeExamplesState = useAppSelector((state) => state.codeExamples);
  const items = CodeExamplesReducer.getSelectors().selectAll(codeExamplesState);
  const viewItems = useMemo(
    () => [
      ...items.filter((item) => item.viewId === viewState.id),
      { viewId: viewState.id, language: 'sql' },
    ],
    [items, viewState.id]
  );

  return (
    <Box px={5} pb={0} pt={3}>
      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        {viewItems.map((item, index) => (
          <CodeExampleItem
            key={`ce-${index}-${item?.id}`}
            initialValue={{ ...item, viewId: viewState.id }}
          />
        ))}
      </Grid>
    </Box>
  );
};
