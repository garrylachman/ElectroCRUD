import { AiOutlineFieldString } from 'react-icons/ai';
import { DataType } from './data-types.define';

export const StringDataType: DataType<string> = {
  name: 'string',
  icon: AiOutlineFieldString,
  examples: {
    short: 'Lorem ipsum',
    medium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  variants: [
    'CHAR',
    'VARCHAR',
    'TINYTEXT',
    'TEXT',
    'MEDIUMTEXT',
    'LONGTEXT',
    'ENUM',
    'CHARACTER',
    'CHAR',
    'CHARACTER VARYING',
    'UUID',
    'nchar',
    'nvarchar',
    'name',
    'xid',
    'oid',
    'cid',
    'pg_node_tree',
    'record',
    'cstring',
    'citext',
    'bpchar',
  ],
  validationFuction: (value) => new RegExp(/[\D\w]+/g).test(value),
  formatter: (value) => value,
};
