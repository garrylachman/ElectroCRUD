import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';
import { DiDatabase } from 'react-icons/di';
import {
  SiMicrosoftsqlserver,
  SiMysql,
  SiPostgresql,
  SiSqlite,
} from 'react-icons/si';
import { ServerType, ServerTypeEnum } from '@electrocrud/shared';

type DatabaseIconProperties = IconProps & {
  client: ServerType;
};

export const DatabaseIcon: FC<DatabaseIconProperties> = ({
  client,
  ...rest
}) => {
  switch (client) {
    case ServerTypeEnum.MYSQL: {
      return <Icon {...rest} as={SiMysql} />;
    }
    case ServerTypeEnum.SQLITE: {
      return <Icon {...rest} as={SiSqlite} />;
    }
    case ServerTypeEnum.POSTGRES: {
      return <Icon {...rest} as={SiPostgresql} />;
    }
    case ServerTypeEnum.MSSQL: {
      return <Icon {...rest} as={SiMicrosoftsqlserver} />;
    }
    default: {
      return <Icon {...rest} as={DiDatabase} />;
    }
  }
};
