// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import BarChart from 'renderer/components/charts/BarChart';

import { barChartDataHoursSpent, barChartOptionsHoursSpent } from 'renderer/variables/charts';

export default function HoursSpent(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const borderColor = useColorModeValue('transparent', 'whiteAlpha.100');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card
			border='1px solid'
			borderColor={borderColor}
			alignItems='center'
			flexDirection='column'
			w='100%'
			{...rest}>
			<Flex justify='space-between' align='start' px='6px' pt='5px'>
				<Flex flexDirection='column' align='start' me='20px'>
					<Text color={textColor} fontSize={{ base: 'lg', lg: 'md', '2xl': 'lg' }} fontWeight='700'>
						Hours Spent
					</Text>
				</Flex>
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						22 h 45 min
					</Text>
				</Flex>
			</Flex>
			<Box h='240px' mt='auto'>
				<BarChart chartData={barChartDataHoursSpent} chartOptions={barChartOptionsHoursSpent} />
			</Box>
		</Card>
	);
}
