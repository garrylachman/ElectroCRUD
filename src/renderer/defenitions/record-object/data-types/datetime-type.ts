import { AiOutlineFieldTime } from 'react-icons/ai';
import { DataType } from './data-types.define';
import moment from 'moment';

export const DateTimeDataType: DataType<Date> = {
  name: 'datetime',
  icon: AiOutlineFieldTime,
  examples: {
    short: '00:00',
    medium: '00:00:00',
    long: '01/01/01 00:00:00',
  },
  variants: [
    'DATE',
    'TIME',
    'DATETIME',
    'YEAR',
    'TIMESTAMP',
    'TIMESTAMPTZ',
    'TIMESTAMP WITH TIMEZONE',
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
