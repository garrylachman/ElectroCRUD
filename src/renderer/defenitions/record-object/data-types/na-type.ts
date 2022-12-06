import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { DataType } from './data-types.define';

export const NADataType: DataType<undefined> = {
  name: 'N/A',
  icon: AiOutlineExclamationCircle,
  examples: {
    short: '',
    medium: '',
    long: '',
  },
  variants: [],
  validationFuction: () => true
};
