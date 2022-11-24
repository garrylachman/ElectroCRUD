// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';

// Assets
import { MdOutlineLocationOn, MdOutlineWbSunny } from 'react-icons/md';

export default function CircularProgress() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'secondaryGray.400');
	const brandColor = useColorModeValue('brand.500', 'white');
	const cardBg = useColorModeValue(
		'linear-gradient(180deg, #F4F7FE 0%, rgba(244, 247, 254, 0) 86.56%)',
		'linear-gradient(180deg, #1B254B 0%, rgba(27, 37, 75, 0) 86.56%)'
	);
	// Chakra Color Mode
	return (
		<Card p='30px'>
			<Text fontSize='lg' mb='12px' lineHeight='100%' color={textColor} fontWeight='bold'>
				Friday, 25 Jun
			</Text>
			<Flex align='center' mb='30px'>
				<Icon as={MdOutlineLocationOn} color='secondaryGray.600' me='8px' h='16px' w='16px' />
				<Text color='secondaryGray.600' fontSize='sm' fontWeight='bold'>
					New York, USA
				</Text>
			</Flex>
			<Flex direction='column' p='16px' borderRadius='22px' bg={cardBg}>
				<Flex w='100%'>
					<Box>
						<Icon as={MdOutlineWbSunny} color={brandColor} h='58px' w='58px' mb='15px' />
						<Text color={textColor} fontSize='42px' lineHeight='110%' fontWeight='bold'>
							25°C
						</Text>
						<Text color={textColorSecondary} fontSize='md' fontWeight='500'>
							Sunny
						</Text>
					</Box>
					<Text ms='auto' color='secondaryGray.700' fontSize='sm' fontWeight='500'>
						H:28° L:17°
					</Text>
				</Flex>
			</Flex>
			<Button variant='brand' borderRadius='70px' maxW='128px' ms='auto'>
				View more
			</Button>
		</Card>
	);
}
