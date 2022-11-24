import { FC } from 'react';
import { ServerType, ServerTypeEnum } from 'shared';
import {
  DiMysql,
  DiDatabase,
  DiSqllite,
  DiPostgresql,
  DiMsqlServer,
} from 'react-icons/di';
import { Icon, IconProps } from '@chakra-ui/react';

type DatabaseIconProps = IconProps & {
  client: ServerType;
};

export const DatabaseIcon: FC<DatabaseIconProps> = ({ client, ...rest }) => {
  switch (client) {
    case ServerTypeEnum.MYSQL:
      return <Icon {...rest} as={DiMysql} />;
    case ServerTypeEnum.SQLITE:
      return <Icon {...rest} as={DiSqllite} />;
    case ServerTypeEnum.POSTGRES:
      return <Icon {...rest} as={DiPostgresql} />;
    case ServerTypeEnum.MSSQL:
      return <Icon {...rest} as={DiMsqlServer} />;
    default:
      return <Icon {...rest} as={DiDatabase} />;
  }
};
