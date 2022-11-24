import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { ConfirmModal, ConfirmModalProps } from './ConfirmModal';

export type ConfirmDeleteModalProps = ConfirmModalProps & {
  entityName: string;
};

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  title = 'Delete',
  entityName,
  ...rest
}) => (
  <ConfirmModal {...rest} title={`${title} ${entityName}`}>
    <Text>{`Are you sure? You can't undo this action afterwards.`}</Text>
  </ConfirmModal>
);
