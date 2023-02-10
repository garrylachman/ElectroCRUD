import { AiOutlineFieldTime } from 'react-icons/ai';
import { DataType } from './data-types.define';
import moment from 'moment';

export const DateTimeDataType: DataType<Date> = {
  name: 'datetime',
  icon: AiOutlineFieldTime,
  examples: {
    short: new Date(),
    medium: new Date(),
    long: new Date(),
  },
  variants: [
    'DATE',
    'TIME',
    'DATETIME',
    'YEAR',
    'TIMESTAMP',
    'TIMESTAMPTZ',
    'TIMESTAMP WITH TIMEZONE',
    'timestamp without time zone',
    'timestamp without timezone',
    'timestamp with time zone',
    'TIMETZ',
    'TIME WITH TIMEZONE',
    'datetime2',
    'datetimeoffset',
    'smalldatetime',
    'abstime',
    'reltime',
    'tinterval',
  ],
  validationFuction: (value) => !Date.parse(value),
  formatter: (value) => moment(value).toDate().toLocaleString(),
};
