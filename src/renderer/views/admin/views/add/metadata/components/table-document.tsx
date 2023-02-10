/* eslint-disable @typescript-eslint/no-empty-function */
// @ts-nocheck
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useCallback, useContext, useMemo, useState } from 'react';
import { MdEdit, MdPreview } from 'react-icons/md';
import { SaveButton } from 'renderer/components/buttons/save-button';
import { ConfirmPromiseSaveModal } from 'renderer/components/modals/confirm-promise-save-modal';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { ViewScopedContext } from 'renderer/contexts';
import { useAppDispatch } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';

import tableDescription from './table-description.md';

// @ts-ignore
export const TabeDocumentation = () => {
  const dispatch = useAppDispatch();
  const { viewState } = useContext(ViewScopedContext);
  const [markdownTemporary, setMarkdown] = useState('');

  const markdown = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => viewState?.metadata?.md || tableDescription,
    [viewState?.metadata?.md, tableDescription]
  );

  const handleSave = useCallback(() => {
    ConfirmPromiseSaveModal({
      entityName: viewState?.name,
    })
      .then(() => {
        dispatch(
          ViewsReducer.actions.upsertOne({
            ...viewState,
            metadata: {
              ...viewState.metadata,
              md: markdownTemporary,
            },
          })
        );
        return true;
      })
      .catch(() => {});
  }, [markdownTemporary, viewState]);

  const RenderPreview = () => (
    <Box p={4}>
      <MarkdownEditor.Markdown source={markdown} />
    </Box>
  );

  const RenderEdit = () => (
    <Box p={4}>
      <MarkdownEditor
        value={markdown}
        onChange={(value, viewUpdate) => setMarkdown(value)}
        enableScroll
        height="350px"
      />
    </Box>
  );

  const tabs: ElectroCRUDTabProperties[] = [
    {
      name: 'Preview',
      element: <RenderPreview key={markdown} />,
      icon: MdPreview,
    },
    {
      name: 'Edit',
      element: <RenderEdit key={markdown} />,
      icon: MdEdit,
    },
  ];

  if (!viewState) {
    return (
      <Center>
        <Spinner size="xl" color="primary.200" />
      </Center>
    );
  }

  return (
    <Box>
      <Box pb={4}>
        <Text>
          Simply data about data. It means it is a description and context of
          the data. It helps to organize, find and understand data.
        </Text>
        <Text>
          You can use our simple example or create your own. We use Markdown
          syntax.
        </Text>
      </Box>
      <ElectroCRUDTabs
        tabsList={tabs}
        key={`ElectroCRUDTabs-${viewState.id || ''}-${
          viewState.modificationDate || ''
        }`}
        tabIndex={0}
        iconSize={5}
        fontSize="md"
        colorScheme="primary"
        isFitted={false}
        isBoxed
      />
      <Box pt={4}>
        <SaveButton onClick={handleSave} />
      </Box>
    </Box>
  );
};
