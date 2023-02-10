import { Card, CardBody } from '@chakra-ui/card';
import { useContext } from 'react';
import { Divider } from '@chakra-ui/react';
import { ViewScopedContext } from 'renderer/contexts';
import { TableDocumentation } from './table-documentation';
import { ColumnDocumentation } from './column-documentation';
import { StrictColumnRO } from 'renderer/defenitions/record-object';

export const Documentation = () => {
  const { viewState } = useContext(ViewScopedContext);

  return (
    <Card
      variant="elevated"
      flex={1}
      display="flex"
      flexDirection="column"
      height="100%"
      overscrollBehavior="contain"
      overflow="scroll"
    >
      <CardBody>
        <TableDocumentation />
        {viewState?.columns.map((row) => (
          <>
            <Divider my={5} />
            <ColumnDocumentation
              columnState={row as unknown as StrictColumnRO}
            />
          </>
        ))}
      </CardBody>
    </Card>
  );
};
