// Chakra imports
import { Icon, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Transaction from 'renderer/components/dataDisplay/Transaction';

// Assets
import {
	MdOutlineShoppingBasket,
	MdOutlineDirectionsBus,
	MdOutlineSubscriptions,
	MdLocalBar,
	MdOutlineWeekend
} from 'react-icons/md';
import { RiNetflixFill } from 'react-icons/ri';

export default function YourTransactions(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const iconColor = useColorModeValue('brand.500', 'white');
	const greenIcon = useColorModeValue('green.500', 'white');
	const redIcon = useColorModeValue('red.500', 'white');
	const blueIcon = useColorModeValue('blue.500', 'white');
	const yellowIcon = useColorModeValue('yellow.500', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card {...rest} p='34px'>
			<Text fontSize='xl' color={textColor} fontWeight='700' mb='34px'>
				Your transactions
			</Text>
			<Transaction
				mb='26px'
				name='Public Transport'
				date='22 September 2022'
				sum='-$15.50'
				icon={<Icon as={MdOutlineDirectionsBus} color={iconColor} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='Grocery Store'
				date='18 September 2022'
				sum='-$42.28'
				icon={<Icon as={MdOutlineShoppingBasket} color={greenIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='Public Transport'
				date='15 September 2022'
				sum='-$11.37'
				icon={<Icon as={MdOutlineSubscriptions} color={yellowIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='Netflix'
				date='12 September 2022'
				sum='-$34.90'
				icon={<Icon as={RiNetflixFill} color={redIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='Drink Store'
				date='09 September 2022'
				sum='-$5.21'
				icon={<Icon as={MdLocalBar} color={blueIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='Drink Store'
				date='09 September 2022'
				sum='-$5.21'
				icon={<Icon as={MdLocalBar} color={blueIcon} w='20px' h='18px' />}
			/>
			<Transaction
				name='Apartment Debt'
				date='05 September 2022'
				sum='-$314.90'
				icon={<Icon as={MdOutlineWeekend} color={greenIcon} w='20px' h='18px' />}
			/>
		</Card>
	);
}
