import { Card, CardBody } from "@chakra-ui/card"
import { TableDocumentation } from "./table-documentation"
import { useContext } from 'react';
import { Divider } from '@chakra-ui/react'
import { ViewScopedContext } from 'renderer/contexts';
import { ColumnDocumentation } from "./column-documentation";

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
        {viewState.columns.map((row) => (
          <>
            <Divider my={5} />
            <ColumnDocumentation columnState={row} />
          </>
        ))}
      </CardBody>
    </Card>
  );
};
