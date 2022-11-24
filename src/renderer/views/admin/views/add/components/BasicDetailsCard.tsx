import {
  Grid,
  Badge,
  Button,
  Flex,
  Icon,
  GridItem,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ViewRO } from 'renderer/defenitions/record-object';
import { useFormContext } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Card from 'renderer/components/card/Card';
import { InputField } from 'renderer/components/fields';

type BasicDetailsCardProps = {
  tables: string[];
  isEditMode?: boolean;
};

export const BasicDetailsCard: FC<BasicDetailsCardProps> = ({
  tables,
  isEditMode = false,
}) => {
  return (
    <Card flexDirection="column">
      <Heading size="md" pb={4}>
        Details
      </Heading>
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
            {tables.map((row) => (
              <option key={row}>{row}</option>
            ))}
          </InputField>
        </GridItem>
      </Grid>
    </Card>
  );
};
