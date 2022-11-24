// Chakra imports
import { Flex, Badge, Text, useColorModeValue } from '@chakra-ui/react';

export default function SessionBadge(props: {
	detail: string;
	name: string;
	status: string;
	color: string;
	[x: string]: any;
}) {
	const { detail, name, status, color, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Flex justifyContent='space-between' alignItems='center' w='100%' {...rest}>
			<Text color={textColor} fontSize='md' me='6px' fontWeight='500'>
				{name}
			</Text>
			<Flex align='center' ms='auto'>
				<Text color='secondaryGray.600' fontSize='sm' fontWeight='400' me='40px'>
					{detail}
				</Text>
				<Badge colorScheme={color} color={`${color}.500`} px='24px' fontSize='sm'>
					{status}
				</Badge>
			</Flex>
		</Flex>
	);
}
