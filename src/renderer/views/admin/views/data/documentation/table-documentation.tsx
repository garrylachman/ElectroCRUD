import MarkdownEditor from '@uiw/react-markdown-editor';
import { useContext } from 'react';
import { Text, Flex, Heading } from '@chakra-ui/react';
import { ViewScopedContext } from 'renderer/contexts';

export const TableDocumentation = () => {
  const { viewState } = useContext(ViewScopedContext);
  return (
    <Flex direction="column">
      <Heading>Table: {viewState?.name}</Heading>
      {viewState?.metadata.md ? (
        <MarkdownEditor.Markdown
          source={viewState?.metadata.md}
          // @ts-ignore
          pluginsFilter={(name, value) => {
            if (name === 'remark') {
              return value;
            }
          }}
        />
      ) : (
        <Text>No table documentation found</Text>
      )}
    </Flex>
  );
};
