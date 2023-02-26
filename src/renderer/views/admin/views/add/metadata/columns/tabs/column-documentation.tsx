/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Box, Center, Spinner, Text, Flex } from '@chakra-ui/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import memoize from 'proxy-memoize';
import { useCallback, useContext, useMemo, useState } from 'react';
import { MdEdit, MdPreview } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { SaveButton } from '@electrocrud/buttons';
import { ConfirmPromiseSaveModal } from 'renderer/components/modals/confirm-promise-save-modal';
import { TabProperties, Tabs } from '@electrocrud/tabs';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { ColumnRO } from 'renderer/defenitions/record-object/view.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ColumnSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

// @ts-ignore
import columnDescription from './column-description.md';

// @ts-ignore
export const ColumnDocumentation = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);
  const [markdownTemporary, setMarkdown] = useState('');

  const columnState = useSelector<RootState, ColumnRO>(
    useCallback(
      memoize((state) =>
        ColumnSelectors.createColumnSelector(state)(memState.columnId)
      ),
      [memState]
    )
  );

  const markdown = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => columnState?.metadata?.md || columnDescription,
    [columnState?.metadata?.md, columnDescription]
  );

  const handleSave = useCallback(() => {
    ConfirmPromiseSaveModal({
      entityName: (columnState as any).name,
    })
      .then(() => {
        dispatch(
          ColumnsReducer.actions.upsertOne({
            ...columnState,
            metadata: {
              ...columnState.metadata,
              md: markdownTemporary,
            },
          })
        );
        return true;
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, [markdownTemporary, columnState]);

  const RenderPreview = () => (
    <Box p={4}>
      <MarkdownEditor.Markdown
        style={{
          pointerEvents: 'none',
          cursor: 'default',
        }}
        source={markdown}
      />
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

  const tabs: TabProperties[] = [
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

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="primary.200" />
      </Center>
    );
  }

  return (
    <Flex px={4} flexDirection="column" flex={1}>
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
      <Tabs
        tabsList={tabs}
        key={`Tabs-${columnState.id || ''}-${
          columnState.modificationDate || ''
        }`}
        tabIndex={0}
        iconSize={5}
        fontSize="md"
        colorScheme="primary"
        isFitted={false}
        isBoxed
        height="inherit"
      />
      <Box pt={4}>
        <SaveButton onClick={handleSave} />
      </Box>
    </Flex>
  );
};
