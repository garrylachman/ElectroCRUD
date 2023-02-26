import MarkdownEditor from '@uiw/react-markdown-editor';
import { FC } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { StrictColumnRO } from 'renderer/defenitions/record-object';

type ColumnDocumentationProperties = {
  columnState: StrictColumnRO;
};
export const ColumnDocumentation: FC<ColumnDocumentationProperties> = ({
  columnState,
}) => {
  return (
    <Flex direction="column">
      <Heading>Column: {columnState?.name}</Heading>
      <>
        {columnState?.metadata.md ? (
          <MarkdownEditor.Markdown
            style={{
              pointerEvents: 'none',
              cursor: 'default',
            }}
            source={columnState?.metadata.md}
          />
        ) : (
          <Text>No table documentation found</Text>
        )}
      </>
    </Flex>
  );
};
