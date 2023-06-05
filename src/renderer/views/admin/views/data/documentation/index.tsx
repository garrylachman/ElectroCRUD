import { useContext } from 'react';
import { Divider, Flex } from '@chakra-ui/react';
import { ViewScopedContext } from 'renderer/contexts';
import { TableDocumentation } from './table-documentation';
import { ColumnDocumentation } from './column-documentation';
import { StrictColumnRO } from 'renderer/defenitions/record-object';

export const Documentation = () => {
  const { viewState } = useContext(ViewScopedContext);

  return (
    <Flex flexDirection="column">
      <TableDocumentation />
      {viewState?.columns.map((row) => (
        <>
          <Divider my={5} />
          <ColumnDocumentation columnState={row as unknown as StrictColumnRO} />
        </>
      ))}
    </Flex>
  );
};
