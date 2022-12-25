import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { MetaColumnsWithContext } from './columns';

type ColumnsMetadataProperties = {};

export const ColumnsMetadata: FC<ColumnsMetadataProperties> = () => {

  return (
    <Box px={5} pb={0} pt={3}>
      <MetaColumnsWithContext />
    </Box>
  );
};
