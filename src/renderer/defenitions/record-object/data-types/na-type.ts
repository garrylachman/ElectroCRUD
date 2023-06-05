import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { DataType } from './data-types.define';

export const NADataType: DataType<undefined> = {
  name: 'N/A',
  icon: AiOutlineExclamationCircle,
  examples: {
    short: undefined,
    medium: undefined,
    long: undefined,
  },
  variants: [],
  validationFuction: () => true,
  formatter: (value) => 'N/A',
};
