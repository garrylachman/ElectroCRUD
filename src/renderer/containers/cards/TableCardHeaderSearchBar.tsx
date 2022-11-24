import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  InputProps,
  Icon,
} from '@chakra-ui/react';
import { PropsWithChildren, FC } from 'react';
import { MdSearch } from 'react-icons/md';

type TableCardHeaderSearchBarProps = InputProps;
export const TableCardHeaderSearchBar: FC<
  PropsWithChildren<TableCardHeaderSearchBarProps>
> = ({ variant, background, children, placeholder, borderRadius, ...rest }) => {
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');

  return (
    <InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="inherit"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          icon={
            <Icon color={searchIconColor} w="20px" h="20px" as={MdSearch} />
          }
        />
      </InputLeftElement>
      <Input
        variant="search"
        fontSize="sm"
        bg={background || inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius || '30px'}
        placeholder={placeholder || 'Search...'}
      />
    </InputGroup>
  );
};
