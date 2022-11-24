// Chakra imports
import { Button, Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/InputField';

export default function Password(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	// Chakra Color Mode
	return (
		<Card {...rest}>
			<Flex direction='column' mb='30px' ms='10px'>
				<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
					Change password
				</Text>
				<Text fontSize='md' color={textColorSecondary}>
					Here you can set your new password
				</Text>
			</Flex>
			<FormControl>
				<Flex flexDirection='column'>
					<InputField mb='25px' id='old' label='Old Password' placeholder='Your old password' />
					<InputField mb='25px' id='new' label='New Password' placeholder='Your new password' />
					<InputField
						mb='25px'
						id='confirm'
						label='New Password Confirmation'
						placeholder='Confirm new password'
					/>
				</Flex>
			</FormControl>
			<Button
				borderRadius='16px'
				minW='183px'
				h='44px'
				ms='auto'
				mt='33px'
				variant='brand'
				color='white'
				fontSize='sm'
				fontWeight='500'
				_hover={{ bg: 'brand.600' }}
				_active={{ bg: 'brand.500' }}
				_focus={{ bg: 'brand.500' }}>
				Change Password
			</Button>
		</Card>
	);
}
