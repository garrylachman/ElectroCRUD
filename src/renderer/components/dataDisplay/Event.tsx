// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
export default function Event(props: { time: string; name: string; [x: string]: any }) {
	const { time, name, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandBg = useColorModeValue('brand.500', 'brand.400');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' {...rest} px='12px' py='16px' borderRadius='16px'>
			<Flex bg={brandBg} w='4px' h='100%' borderRadius='16px' me='10px' />
			<Flex direction='column' align='start' me='auto'>
				<Text textAlign='start' color={textColor} fontSize='md' me='6px' fontWeight='700'>
					{name}
				</Text>
				<Text textAlign='start' color='secondaryGray.600' fontSize='sm' fontWeight='500'>
					{time}
				</Text>
			</Flex>
		</Flex>
	);
}
