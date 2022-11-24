// Chakra imports
import { Flex, Text, Avatar, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import profileAvatar from 'renderer/assets/img/avatars/avatar4.png';

export default function Profile(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	// Chakra Color Mode
	return (
		<Card mb='20px' {...rest}>
			<Flex align='center'>
				<Avatar src={profileAvatar} h='87px' w='87px' me='20px' />
				<Flex direction='column'>
					<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl'>
						Adela Parkson
					</Text>
					<Text mt='1px' color={textColorSecondary} fontSize='md'>
						adela@simmmple.com
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
