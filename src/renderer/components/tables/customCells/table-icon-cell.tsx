import { Tag, TagLeftIcon, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

type TableIconCellProps = {
  icon: IconType;
  tooltip: string;
};

export const TableIconCell: FC<TableIconCellProps> = ({ icon, tooltip }) => {
  return (
    <Tooltip label={tooltip}>
      <Tag variant="subtle" colorScheme={'brand'}>
        <TagLeftIcon as={icon} me={0} fontSize='md' />
      </Tag>
    </Tooltip>
  );
};
