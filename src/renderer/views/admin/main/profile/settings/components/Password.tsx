// Chakra imports
import { Button, Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/InputField';

export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Change password
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can set your new password
					</Text>
				</Flex>
				<FormControl>
					<Flex flexDirection='column'>
						<InputField mb='25px' id='old' label='Old Password' placeholder='@john123' />
						<InputField mb='25px' id='new' label='New Password' placeholder='@john123' />
						<InputField mb='25px' id='confirm' label='New Password Confirmation' placeholder='@john123' />
					</Flex>
				</FormControl>
				<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' ms='auto'>
					Change Password
				</Button>
			</Card>
		</FormControl>
	);
}
