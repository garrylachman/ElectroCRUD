import { Icon, Text } from '@chakra-ui/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { v4 } from 'uuid';

import { ConfirmPromiseModal } from './confirm-promise-modal';

export const ConfirmPromiseDeleteModal = ({
  entityName,
}: {
  entityName?: string;
}) =>
  ConfirmPromiseModal({
    keyu: v4(),
    instanceId: v4(),
    confirmButtonText: 'Delete',
    confirmButtonColorScheme: 'primary',
    title: (
      <Text display="inline-flex" fontWeight="medium" textTransform="uppercase">
        Delete{' '}
        <Text fontWeight="bold" ml={2}>
          <Icon as={FaQuoteLeft} w={3} h={3} color="white" mx={2} />
          {entityName}
          <Icon as={FaQuoteRight} w={3} h={3} color="white" mx={2} />
        </Text>
      </Text>
    ),
    children: `Are you sure? You can't undo this action afterwards.`,
  });
