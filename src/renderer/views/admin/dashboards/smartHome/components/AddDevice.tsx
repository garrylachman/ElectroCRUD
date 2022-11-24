// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import IconBox from 'renderer/components/icons/IconBox';

// Assets
import { MdAdd } from 'react-icons/md';

export default function AddDevice(props: { [x: string]: any }) {
	const { mb, ...rest } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brand = useColorModeValue('brand.500', 'brand.400');
	const bg = useColorModeValue('gray.100', 'navy.700');
	const border = useColorModeValue('23E0E5F2FF', '23FFFFFF1A');

	return (
		<Card p='30px' {...rest}>
			<Box>
				<Flex
					align='center'
					justify='center'
					bg={bg}
					bgImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%${border}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`}
					borderRadius='16px'
					w='100%'
					cursor='pointer'
					mb='12px'
					py='70px'>
					<IconBox
						h='64px'
						w='64px'
						bg={brand}
						borderRadius='24px'
						boxShadow='0px 20px 40px -10px rgba(67, 24, 255, 0.6)'
						icon={<Icon as={MdAdd} w='50px' h='50px' color='white' />}
					/>
				</Flex>
				<Text textAlign='center' fontSize='2xl' fontWeight='700' me='6px' color={textColor}>
					Add new device
				</Text>
				<Text textAlign='center' fontSize='sm' fontWeight='500' color='secondaryGray.500'>
					Evolve your smart house with a new device!
				</Text>
			</Box>
		</Card>
	);
}
