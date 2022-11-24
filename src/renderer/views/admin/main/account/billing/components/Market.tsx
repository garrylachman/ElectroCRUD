// Chakra imports
import { Button, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Stock from 'renderer/views/admin/main/account/billing/components/Stock';
import { MdPieChart } from 'react-icons/md';
import LineChart from 'renderer/components/charts/LineChart';
import {
	lineChartDataMiniArea1,
	lineChartOptionsMiniArea1,
	lineChartDataMiniArea2,
	lineChartOptionsMiniArea2
} from 'renderer/variables/charts';

export default function Market(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	return (
		<Card flexDirection='column' w='100%' p='34px' {...rest}>
			<Flex justify='space-between' mb='30px' align='center'>
				<Text color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Market
				</Text>
				<Button
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdPieChart} color={iconColor} w='20px' h='20px' />
				</Button>
			</Flex>

			<Stock
				mb='20px'
				name='XPEV'
				sum='350.4'
				growth='+2.45'
				chart={<LineChart chartData={lineChartDataMiniArea1} chartOptions={lineChartOptionsMiniArea1} />}
			/>
			<Stock
				mb='20px'
				name='AAPL'
				sum='742.3'
				growth='+2.45'
				chart={<LineChart chartData={lineChartDataMiniArea1} chartOptions={lineChartOptionsMiniArea1} />}
			/>
			<Stock
				mb='20px'
				name='TSLA'
				sum='3,485.9'
				growth='-1.51%'
				chart={<LineChart chartData={lineChartDataMiniArea2} chartOptions={lineChartOptionsMiniArea2} />}
			/>
			<Stock
				mb='20px'
				name='PFE'
				sum='120.4'
				growth='-1.51%'
				chart={<LineChart chartData={lineChartDataMiniArea2} chartOptions={lineChartOptionsMiniArea2} />}
			/>
			<Stock
				mb='20px'
				name='XPEV'
				sum='350.4'
				growth='+2.45'
				chart={<LineChart chartData={lineChartDataMiniArea1} chartOptions={lineChartOptionsMiniArea1} />}
			/>
			<Stock
				mb='20px'
				name='BNB'
				date='September, 07 2021'
				sum='2,983.2'
				growth='-1.51%'
				chart={<LineChart chartData={lineChartDataMiniArea2} chartOptions={lineChartOptionsMiniArea2} />}
			/>
			<Stock
				mb='20px'
				name='MSFT'
				sum='309.4'
				growth='+4.45'
				chart={<LineChart chartData={lineChartDataMiniArea1} chartOptions={lineChartOptionsMiniArea1} />}
			/>
		</Card>
	);
}
