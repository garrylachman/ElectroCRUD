// Chakra imports
import { Flex, Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import LineChart from 'renderer/components/charts/LineChart';

// Custom components
import Card from 'renderer/components/card/Card';
import Menu from 'renderer/components/menu/MainMenu';
import IconBox from 'renderer/components/icons/IconBox';

import { lineChartDataProjectStatus, lineChartOptionsProjectStatus } from 'renderer/variables/charts';

// Assets
import { MdOutlineShoppingBasket } from 'react-icons/md';

export default function ProjectStatus(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const iconBoxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex justify='space-between' px='10px' pt='5px' mb='20px' align='center'>
				<Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%'>
					Project Status
				</Text>
				<Menu />
			</Flex>
			<Flex justifyContent='center' alignItems='center' w='100%' px='10px'>
				<IconBox
					h='42px'
					w='42px'
					bg={iconBoxBg}
					me='20px'
					icon={<Icon color={iconColor} as={MdOutlineShoppingBasket} h='24px' w='24px' />}
				/>
				<Flex direction='column' align='start' me='auto'>
					<Text color={textColor} fontSize='lg' me='6px' fontWeight='700'>
						eCommerce
					</Text>
					<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
						UI Design
					</Text>
				</Flex>
				<Flex align='end'>
					<Text lineHeight='100%' ms='auto' color={textColor} fontSize='2xl' fontWeight='700'>
						71
					</Text>
					<Text ms='auto' lineHeight='100%' color={textColor} fontSize='sm' fontWeight='700'>
						%
					</Text>
				</Flex>
			</Flex>
			<Box minH='250px' mt='auto'>
				<LineChart chartData={lineChartDataProjectStatus} chartOptions={lineChartOptionsProjectStatus} />
			</Box>
		</Card>
	);
}
