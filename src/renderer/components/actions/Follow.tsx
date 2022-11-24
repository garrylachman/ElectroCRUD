// Chakra imports
import { Avatar, Flex, Button, Text, useColorModeValue } from '@chakra-ui/react';

export default function Transaction(props: {
	username: string;
	sum: string | number;
	avatar: string;
	name: string;
	action?: () => any;
	[x: string]: any;
}) {
	const { username, sum, avatar, name, action, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' {...rest}>
			<Avatar h={{ base: '40px', '2xl': '50px' }} w={{ base: '40px', '2xl': '50px' }} src={avatar} me='16px' />
			<Flex direction='column' align='start' me='auto'>
				<Text color={textColor} fontSize={{ base: 'sm', '2xl': 'md' }} me='6px' fontWeight='700'>
					{name}
				</Text>
				<Text color='secondaryGray.600' fontSize={{ base: 'xs', '2xl': 'sm' }} fontWeight='500'>
					{username}
				</Text>
			</Flex>
			<Button
				ms='auto'
				bg='transparent'
				variant='no-hover'
				color={brandColor}
				fontSize='sm'
				fontWeight='700'
				onClick={action}>
				Follow
			</Button>
		</Flex>
	);
}
