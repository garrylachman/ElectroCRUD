import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField } from 'renderer/components/fields';
import { ViewRO } from 'renderer/defenitions/record-object';
import { useIPCTablesList } from 'renderer/ipc';
import { IPCChannelEnum } from 'shared';

type BasicDetailsCardProperties = {
  isEditMode?: boolean;
};

export const BasicDetailsCard: FC<BasicDetailsCardProperties> = ({
  isEditMode = false,
}) => {
  const { result, execute, isExecuted, isLoading } = useIPCTablesList({
    channel: IPCChannelEnum.TABLES_LIST,
  });

  useEffect(() => {
    if (!isExecuted) {
      execute();
    }
  }, []);

  return (
    <Card variant="elevated">
      <CardHeader>
        Details
      </CardHeader>
      <CardBody>
      {isExecuted && (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <InputField
              id="name"
              label="Name"
              placeholder="Enter view name"
              type="text"
              size="lg"
              isRequired
              inSubCard
              helpText="Friendly view name"
            />
          </GridItem>
          <GridItem>
            <InputField
              id="table"
              label="Table"
              extra={
                <Badge variant="subtle" colorScheme="cyan" fontSize="8px">
                  from database
                </Badge>
              }
              placeholder="Select a table"
              type="select"
              size="lg"
              isRequired
              isReadOnly={isEditMode}
              inSubCard
              helpText="The table your views will represent"
              helpReadOnly="Cannot be changed in edit mode"
            >
              {result?.body?.map((row) => (
                <option key={row}>{row}</option>
              ))}
            </InputField>
          </GridItem>
        </Grid>
      )}
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      </CardBody>
    </Card>
  );
};
