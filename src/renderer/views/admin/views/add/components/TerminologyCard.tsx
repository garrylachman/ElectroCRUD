import { Grid, Heading } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { InputField } from 'renderer/components/fields';

export const TerminologyCard = () => {
  return (
    <Card flexDirection="column">
      <Heading size="md" pb={5}>
        Terminology
      </Heading>
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
    </Card>
  );
};
