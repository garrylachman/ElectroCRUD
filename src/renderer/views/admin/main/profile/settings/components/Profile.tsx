// Chakra imports
import { Avatar, Flex, Image, Select, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';

export default function Settings(props: { name: string; avatar: string; banner: string }) {
	const { name, avatar, banner } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<Card mb='20px' alignItems='center'>
			<Image src={banner} borderRadius='16px' />
			<Avatar mx='auto' src={avatar} h='87px' w='87px' mt='-43px' mb='15px' />
			<Text fontSize='2xl' textColor={textColorPrimary} fontWeight='700'>
				{name}
			</Text>
			<Flex align='center' mx='auto' px='15px'>
				<Text me='4px' color={textColorSecondary} fontSize='sm' fontWeight='400' lineHeight='100%'>
					Account type:
				</Text>
				<Select
					id='user_type'
					w='unset'
					variant='transparent'
					display='flex'
					textColor={textColorPrimary}
					color={textColorPrimary}
					alignItems='center'
					defaultValue='Administrator'>
					<option value='Administrator'>Administrator</option>
					<option value='Member'>Member</option>
				</Select>
			</Flex>
		</Card>
	);
}
