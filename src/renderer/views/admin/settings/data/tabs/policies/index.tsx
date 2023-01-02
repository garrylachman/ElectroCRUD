import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import memoize from 'proxy-memoize';
import { AddButton } from 'renderer/components/buttons';
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
    <Flex flexDirection="column" flex={1}>
      <Flex p={4} justifyContent="space-between">
        <Text>
          Policies rules applied by column tags. You can created masking rules that
          applyed on the data by column tags.
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
