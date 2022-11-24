// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';

import { MdCheck, MdClose, MdTimer } from 'react-icons/md';

export default function OrderStep(props: {
	date?: string;
	sum?: string;
	icon: JSX.Element;
	status?: string;
	name: string;
	[x: string]: any;
}) {
	const { date, sum, icon, status, name, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('secondaryGray.600', 'white');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' zIndex='2' {...rest}>
			{icon}
			<Flex direction='column' align='start' ms='20px' mr='auto'>
				<Text color={textColor} fontSize='md' me='6px' fontWeight='500'>
					{name}
				</Text>
				<Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
					{date}
				</Text>
			</Flex>
			{status === 'done' ? (
				<Flex
					align='center'
					justify='center'
					h='30px'
					w='30px'
					borderRadius='50%'
					border='1px solid'
					borderColor='green.500'>
					<Icon h='18px' w='18px' as={MdCheck} color='green.500' />
				</Flex>
			) : status === 'error' ? (
				<Flex
					align='center'
					justify='center'
					h='30px'
					w='30px'
					borderRadius='50%'
					border='2px solid'
					borderColor='red.500'>
					<Icon h='18px' w='18px' as={MdClose} color='red.500' />
				</Flex>
			) : (
				<Icon h='34px' w='34px' color={iconColor} as={MdTimer} />
			)}
		</Flex>
	);
}
