import { Tag, TagLeftIcon } from '@chakra-ui/react';
import { FC } from 'react';
import { MdDone, MdClose } from 'react-icons/md';

type TableBooleanCellProps = {
  value: boolean;
};

export const TableBooleanCell: FC<TableBooleanCellProps> = ({ value }) => {
  return (
    <Tag variant="subtle" colorScheme={value ? 'green' : 'red'}>
      <TagLeftIcon as={value ? MdDone : MdClose} me={0} />
    </Tag>
  );
};
