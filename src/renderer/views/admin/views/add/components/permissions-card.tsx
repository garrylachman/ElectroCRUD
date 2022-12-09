import { Card, CardBody, CardHeader, Grid } from '@chakra-ui/react';
import { InputField } from 'renderer/components/fields';

export const PermissionsCard = () => {
  return (
    <Card variant="solid">
      <CardHeader>
        Permissions
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  );
};
