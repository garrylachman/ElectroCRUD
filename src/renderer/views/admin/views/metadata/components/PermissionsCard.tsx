import { Grid, Heading } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { InputField } from 'renderer/components/fields';

export const PermissionsCard = () => {
  return (
    <Card flexDirection="column">
      <Heading size="md" pb={5}>
        Permissions
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <InputField
          id="permissions.create"
          label="Create"
          placeholder="Create"
          type="checkbox"
          size="sm"
          isRequired
          inSubCard
          helpText="Write permission"
        />
        <InputField
          id="permissions.read"
          label="Read"
          placeholder="Read"
          type="checkbox"
          size="sm"
          isRequired
          inSubCard
          helpText="Read permission"
        />
        <InputField
          id="permissions.update"
          label="Update"
          placeholder="Update"
          type="checkbox"
          size="sm"
          isRequired
          inSubCard
          helpText="Update permission"
        />
        <InputField
          id="permissions.delete"
          label="Delete"
          placeholder="Delete"
          type="checkbox"
          size="sm"
          isRequired
          inSubCard
          helpText="Delete permission"
        />
      </Grid>
    </Card>
  );
};
