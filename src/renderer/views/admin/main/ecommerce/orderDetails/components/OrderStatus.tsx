// Chakra imports
import { Icon, Text, Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import OrderStep from 'renderer/components/dataDisplay/OrderStep';
import IconBox from 'renderer/components/icons/IconBox';
// Assets
import { MdPointOfSale, MdShoppingBasket, MdArchive, MdLocalShipping, MdCheckCircle } from 'react-icons/md';

export default function YourOrderSteps(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const completeBg = useColorModeValue('white', 'linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)');
	const completeShadow = useColorModeValue(
		'0px 18px 40px rgba(112, 144, 176, 0.12)',
		'inset 0px 4px 4px rgba(255, 255, 255, 0.2)'
	);
	const incompleteColor = useColorModeValue('secondaryGray.600', 'whiteAlpha.200');
	const incompleteShadow = useColorModeValue(
		'inset 0px 18px 22px rgba(112, 144, 176, 0.1)',
		'inset 0px 4px 4px #0B1437'
	);
	const lineColor = useColorModeValue('%234318FFFF', '%23FFFFFF1A');
	return (
		<Card flexDirection='column' w='100%' pt='30px' pb='20px' {...rest}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' lineHeight='100%' mb='40px'>
				Order Status
			</Text>
			<Flex position='relative' direction='column'>
				<Flex
					position='absolute'
					left='32.5px'
					h='100%'
					w='2px'
					bg={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${lineColor}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
					zIndex={1}
				/>
				<OrderStep
					mb='80px'
					name='Order Placed'
					date='27 Jul 2022'
					status='done'
					icon={
						<IconBox
							h='66px'
							w='66px'
							bg={completeBg}
							boxShadow={completeShadow}
							icon={<Icon as={MdPointOfSale} color={brandColor} h='32px' w='32px' />}
						/>
					}
				/>
				<OrderStep
					mb='80px'
					name='Products Picked'
					date='27 Jul 2022'
					status='done'
					icon={
						<IconBox
							h='66px'
							w='66px'
							bg={completeBg}
							boxShadow={completeShadow}
							icon={<Icon as={MdShoppingBasket} color={brandColor} h='32px' w='32px' />}
						/>
					}
				/>
				<OrderStep
					mb='80px'
					name='Order Packed'
					date='28 Jul 2022'
					status='done'
					icon={
						<IconBox
							h='66px'
							w='66px'
							bg={completeBg}
							boxShadow={completeShadow}
							icon={<Icon as={MdArchive} color={brandColor} h='32px' w='32px' />}
						/>
					}
				/>
				<OrderStep
					mb='80px'
					name='Shipped'
					date='28 Jul 2022'
					status='done'
					icon={
						<IconBox
							h='66px'
							w='66px'
							bg={completeBg}
							boxShadow={completeShadow}
							icon={<Icon as={MdLocalShipping} color={brandColor} h='32px' w='32px' />}
						/>
					}
				/>
				<OrderStep
					name='Delivered'
					icon={
						<IconBox
							h='66px'
							w='66px'
							bg={completeBg}
							boxShadow={incompleteShadow}
							icon={<Icon as={MdCheckCircle} color={incompleteColor} h='32px' w='32px' />}
						/>
					}
				/>
			</Flex>
		</Card>
	);
}
