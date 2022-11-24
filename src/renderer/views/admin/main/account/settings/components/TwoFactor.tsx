// Chakra imports
import { Badge, Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import SetUp from 'renderer/components/actions/SetUp';

export default function TwoFactor(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
	// Chakra Color Mode
	return (
		<FormControl>
			<Card p='30px' {...rest}>
				<Flex justify='space-between' align='center'>
					<Text fontSize='2xl' color={textColorPrimary} fontWeight='bold'>
						Two-Factor Authentication
					</Text>
					<Badge colorScheme='green' color='green.500' fontWeight='bold' fontSize='sm'>
						Enabled
					</Badge>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing={{ base: '20px', xl: '0px' }}>
					<SetUp
						py='24px'
						borderBottom='1px solid'
						borderColor={borderColor}
						name='Authenticator App'
						value='Not configured'
						actionName='Set up'
					/>
					<SetUp
						py='24px'
						borderBottom='1px solid'
						borderColor={borderColor}
						name='Security Keys'
						value='Not keys added'
						actionName='Set up'
					/>
					<SetUp
						py='24px'
						borderBottom='1px solid'
						borderColor={borderColor}
						name='Security Keys'
						value='Not keys added'
						actionName='Set up'
					/>
					<SetUp pt='24px' name='Telephone Number' value='+502 9414 929' actionName='Edit' />
				</SimpleGrid>
			</Card>
		</FormControl>
	);
}
