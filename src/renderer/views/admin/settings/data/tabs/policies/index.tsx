import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import memoize from 'proxy-memoize';
import { AddButton } from '@electrocrud/buttons';
import { ConfirmPromiseDeleteModal } from 'renderer/components/modals';
import { StrictPolicyRuleRO } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { PoliciesReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { PoliciesTable } from './policies-table';
import { PolicyModal } from './policy-modal';

export * from './policies-table';

export const Policies = () => {
  const dispatch = useAppDispatch();
  const policyState = useAppSelector((rootState: RootState) =>
    memoize((state: RootState) => state.policies)(rootState)
  );

  const handleAddEdit = (policy?: StrictPolicyRuleRO) =>
    PolicyModal({ policyId: policy?.id })
      .then((data) => dispatch(PoliciesReducer.actions.upsertOne(data)))
      .catch(() => {});

  const handleDelete = (policy: StrictPolicyRuleRO) =>
    ConfirmPromiseDeleteModal({ entityName: policy.name })
      .then(() => dispatch(PoliciesReducer.actions.removeOne(policy.id)))
      .catch(() => {});

  return (
    <Flex flexDirection="column" flex={1} height="100%" width="100%">
      <Flex justifyContent="space-between">
        <Text pr={3}>
          We use tags to apply a policy on the data based on column. The policy
          can be attached to tag/s and then the tag is attched to the column you
          want the policy will be applied.
        </Text>
        <AddButton onClick={() => handleAddEdit()} />
      </Flex>
      <Box pt={4}>
        <PoliciesTable
          policyState={policyState}
          handleEdit={handleAddEdit}
          handleDelete={handleDelete}
        />
      </Box>
    </Flex>
  );
};
