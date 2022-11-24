// Chakra imports
import { Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';

// Assets
import { MdVerified } from 'react-icons/md';

export default function Banner(props: { creator: string; desc: string }) {
	const { creator, desc } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorLink = useColorModeValue('blue.500', 'white');
	// Chakra Color Mode
	return (
		<Card p='30px' mb={{ base: '20px', '2xl': '20px' }}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
				Description
			</Text>
			<Flex align='center' mb='20px'>
				<Text color='secondaryGray.600' fontSize='lg' fontWeight='400'>
					Created by
				</Text>
				<Text color={textColorLink} fontSize='lg' fontWeight='500' mx='4px'>
					{creator}
				</Text>
				<Icon as={MdVerified} h='16px' w='16px' color='blue.500' mt='3px' />
			</Flex>
			<Text color={textColor} fontSize='lg' fontWeight='400' lineHeight='180%'>
				{desc}
			</Text>
		</Card>
	);
}
