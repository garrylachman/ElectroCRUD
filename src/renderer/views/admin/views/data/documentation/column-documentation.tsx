import MarkdownEditor from '@uiw/react-markdown-editor';
import { FC } from 'react';
import { Flex, Heading, Text   } from '@chakra-ui/react';
import { ColumnRO } from 'renderer/defenitions/record-object';

type ColumnDocumentationProperties = {
  columnState: ColumnRO;
};
export const ColumnDocumentation: FC<ColumnDocumentationProperties> = ({
  columnState,
}) => {
  return (
    <Flex direction="column">
      <Heading>Column: {columnState?.name}</Heading>
      <>
        {
          !columnState?.metadata.md ? 
          (<Text>No table documentation found</Text>) : 
          (<MarkdownEditor.Markdown source={columnState?.metadata.md} />)
        }
      </>
    </Flex>
  )
};
