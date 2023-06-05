import { Box, CardBody } from '@chakra-ui/react';
import { FC } from 'react';

import { DesignerDetails } from '../../add/designer/tabs/details';

type DataDetailsCardProperties = {
  data: Record<string, any>;
};

export const DataDetailsCard: FC<DataDetailsCardProperties> = ({ data }) => {
  return (
    <Box p={0} m={0} flex={1} display="flex" flexDirection="column" h="100%">
      <CardBody px={0} pb={0} overflow="scroll" py={0}>
        <DesignerDetails data={data} readOnly />
      </CardBody>
    </Box>
  );
};
