// Chakra imports
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';
import TextField from 'renderer/components/fields/TextField';

export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card mb={{ base: '0px', xl: '20px' }}>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Product Information
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change your product information
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<InputField
						mb='0px'
						me='30px'
						id='productName'
						label='Product Name'
						placeholder='eg. Elegant Chair'
					/>
					<InputField mb='0px' id='collection' label='Collection' placeholder='eg. Classics' />
					<Flex direction='column'>
						<InputField mb='25px' me='30px' id='weight' label='Weight' placeholder='eg. 20kg' />
						<InputField mb='0px' id='color' label='Color' placeholder='eg. Purple' />
					</Flex>
					<TextField
						id='description'
						label='Description'
						mb='0px'
						h='100%'
						placeholder='Short description about the product'
					/>
				</SimpleGrid>
			</Card>
		</FormControl>
	);
}
