// Chakra imports
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import CircularProgress from 'renderer/components/charts/CircularProgress';
import { VSeparator } from 'renderer/components/separator/Separator';

// Custom components
import Card from 'renderer/components/card/Card';

export default function ProfitEstimation(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Text color={textColor} fontSize='lg' fontWeight='700' mb='10px' mx='auto'>
				Profit Estimation
			</Text>
			<Text color='secondaryGray.600' fontSize='sm' fontWeight='500' maxW='200px' mx='auto' mb='10px'>
				Discover your profit, and learn more about your business
			</Text>
			<Flex justifyContent='center' alignItems='center' w='100%' px='10px' mb='8px' />
			<Box w='140px' mx='auto' mb='10px' mt='10px'>
				<CircularProgress title='Conversion' percentage={66} />
			</Box>
			<Card bg={cardColor} flexDirection='row' p='15px' px='20px' mt='auto'>
				<Flex direction='column' py='5px'>
					<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
						Est. Sales
					</Text>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						1540
					</Text>
				</Flex>
				<VSeparator ms='70px' me='20px' />
				<Flex direction='column' py='5px'>
					<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
						Est. Profit
					</Text>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						$3.984
					</Text>
				</Flex>
			</Card>
		</Card>
	);
}
