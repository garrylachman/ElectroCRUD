// Chakra imports
import { Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/InputField';

export default function Socials(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	// Chakra Color Mode
	return (
		<FormControl>
			<Card mb='20px' {...rest}>
				<Flex direction='column' mb='30px' ms='10px'>
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
				<InputField
					mb='25px'
					id='dribbble_username'
					label='Dribbble Username'
					placeholder='Dribbble Username'
				/>
			</Card>
		</FormControl>
	);
}
