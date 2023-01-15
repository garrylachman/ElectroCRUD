import { Box, Center, Spinner, Text, useBoolean } from '@chakra-ui/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import _ from 'lodash';
import memoize from 'proxy-memoize';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MdEdit, MdPreview } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { SaveButton } from 'renderer/components/buttons/save-button';
import {
  ConfirmPromiseSaveModal,
} from 'renderer/components/modals/confirm-promise-save-modal';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { ColumnRO } from 'renderer/defenitions/record-object/view.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ColumnSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

import columnDescription from './column-description.md';

// @ts-ignore
export const ColumnDocumentation = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);
  const [markdownTemp, setMarkdown] = useState('');

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
      entityName: columnState.name,
    })
      .then(() => {
        dispatch(
          ColumnsReducer.actions.upsertOne({
            ...columnState,
            metadata: {
              ...columnState.metadata,
              md: markdownTemp,
            },
          })
        );
        return true;
      })
      .catch(() => {});
  }, [markdownTemp, columnState]);

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

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="primary.200" />
      </Center>
    );
  }

  return (
    <Box px={4}>
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
        key={`ElectroCRUDTabs-${columnState.id || ''}-${columnState.modificationDate || ''}`}
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
