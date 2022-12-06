// Chakra imports
import { Button, Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';
import TextField from 'renderer/components/fields/TextField';

export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Account Settings
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change user account information
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<InputField mb='25px' me='30px' id='username' label='Username' placeholder='@john123' />
					<InputField mb='25px' id='email' label='Email Address' placeholder='mail@simmmple.com' />
					<InputField mb='25px' me='30px' id='first_name' label='First Name' placeholder='John' />
					<InputField mb='25px' id='last_name' label='Last Name' placeholder='Doe' />
				</SimpleGrid>
				<InputField id='job' label='Job' placeholder='Web Developer' />
				<TextField
					id='about'
					label='About Me'
					h='100px'
					placeholder='Tell something about yourself in 150 characters!'
				/>
				<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' ms='auto'>
					Save changes
				</Button>
			</Card>
		</FormControl>
	);
}
