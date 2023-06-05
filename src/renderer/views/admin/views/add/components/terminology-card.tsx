import { Card, CardBody, CardHeader, Grid } from '@chakra-ui/react';
import { InputField } from 'renderer/components/fields';

export const TerminologyCard = () => {
  return (
    <Card variant="elevated">
      <CardHeader>Terminology</CardHeader>
      <CardBody>
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          <InputField
            id="terminology.singular"
            label="Singular"
            placeholder="Singular"
            type="text"
            size="sm"
            isRequired
            inSubCard
            helpText="How you call single item?"
          />
          <InputField
            id="terminology.plural"
            label="Plural"
            placeholder="Plural"
            type="text"
            size="sm"
            isRequired
            inSubCard
            helpText="How you call multiple items?"
          />
        </Grid>
      </CardBody>
    </Card>
  );
};
