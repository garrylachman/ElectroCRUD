// Chakra imports
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/InputField';
import TextField from 'renderer/components/fields/TextField';

export default function Information(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	// Chakra Color Mode
	return (
		<FormControl>
			<Card mb='20px' {...rest}>
				<Flex direction='column' mb='30px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Account Settings
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change user account information
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<InputField mb='0px' me='30px' id='username' label='Username' placeholder='@simmmple.web' />
					<InputField mb='0px' id='email' label='Email Address' placeholder='mail@simmmple.com' />
					<InputField mb='20px' me='30px' id='first_name' label='First Name' placeholder='John' />
					<InputField mb='20px' id='last_name' label='Last Name' placeholder='William' />
				</SimpleGrid>
				<InputField id='job' label='Job' placeholder='Web Developer' />
				<TextField
					id='about'
					label='About Me'
					h='100px'
					placeholder='Tell something about yourself in 150 characters!'
				/>
			</Card>
		</FormControl>
	);
}
