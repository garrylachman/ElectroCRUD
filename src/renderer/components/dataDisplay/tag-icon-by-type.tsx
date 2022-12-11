import { TagLeftIcon } from '@chakra-ui/react';
import { FC } from 'react';
import {
  findType,
} from 'renderer/defenitions/record-object/data-types/data-type-finder';

type TagIconByTypeProperties = {
  type: string;
  fontSize?: number;
};

export const TagIconByType: FC<TagIconByTypeProperties> = ({ type, fontSize = 15 }) => {
  const dataType = findType(type);
  if (dataType) {
    return <TagLeftIcon fontSize={fontSize} as={dataType.icon} />;
  }
  return <></>;
};
