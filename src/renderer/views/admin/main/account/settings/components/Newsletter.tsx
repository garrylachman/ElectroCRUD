// Chakra imports
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import SwitchField from 'renderer/components/fields/SwitchField';

export default function Newsletter(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	// Chakra Color Mode
	return (
		<FormControl>
			<Card p='30px' mb='20px' {...rest}>
				<Flex mb='40px' justify='space-between' align='center'>
					<Text fontSize='2xl' color={textColorPrimary} fontWeight='bold'>
						Newsletter
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing={{ base: '20px', xl: '0px' }}>
					<SwitchField
						mb='25px'
						me='30px'
						id='1'
						label='Weekly newsletter'
						desc='Get notified about articles, discounts and new products.'
					/>
					<SwitchField
						mb='25px'
						me='30px'
						id='2'
						label='Lifecycle emails'
						desc='Get personalized offers and emails based on your activity.'
					/>
				</SimpleGrid>
				<SwitchField
					mb='25px'
					me='30px'
					id='3'
					label='Promotional emails'
					desc='Get personalized offers and emails based on your orders & preferences.'
				/>
				<SwitchField
					me='30px'
					id='4'
					textWidth='60%'
					label='Product updates'
					desc='Checking this will allow us to notify you when we make updates to products you have downloaded/purchased.'
				/>
			</Card>
		</FormControl>
	);
}
