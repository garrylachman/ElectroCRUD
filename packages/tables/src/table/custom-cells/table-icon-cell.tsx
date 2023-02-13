import { Tag, TagLeftIcon } from '@chakra-ui/react';
import { Tooltip } from '@electrocrud/feedback';
import { FC } from 'react';
import { IconType } from 'react-icons';

type TableIconCellProperties = {
  icon: IconType;
  tooltip: string;
};

export const TableIconCell: FC<TableIconCellProperties> = ({
  icon,
  tooltip,
}) => {
  return (
    <Tooltip label={tooltip}>
      <Tag variant="subtle" colorScheme="primary" justifyContent="center">
        <TagLeftIcon as={icon} me={0} fontSize="md" />
      </Tag>
    </Tooltip>
  );
};
