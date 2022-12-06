// Chakra imports
import { Button, Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';

export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card mb='20px' pb='50px'>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Social Profiles
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can set user social profiles
					</Text>
				</Flex>
				<InputField mb='25px' id='twitter_username' label='Twitter Username' placeholder='Twitter Username' />
				<InputField
					mb='25px'
					id='facebook_username'
					label='Facebook Username'
					placeholder='Facebook Username'
				/>
				<InputField mb='25px' id='github_username' label='Github Username' placeholder='Github Username' />
				<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' ms='auto'>
					Save changes
				</Button>
			</Card>
		</FormControl>
	);
}
