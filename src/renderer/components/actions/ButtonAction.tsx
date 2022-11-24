// Chakra imports
import { Flex, Button, Text, useColorModeValue } from '@chakra-ui/react';

export default function ButtonAction(props: {
	date: string;
	sum: string | number;
	icon?: JSX.Element;
	name: string;
	action: () => void | any;
	actionName: string;
	[x: string]: any;
}) {
	const { date, sum, icon, name, action, actionName, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' {...rest}>
			<Flex direction='column' align='start' me='auto'>
				<Text color={textColor} fontSize='md' me='6px' fontWeight='700'>
					{date}
				</Text>
				<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
					{name}
				</Text>
			</Flex>
			<Text ms='auto' color={textColor} fontSize='sm' me='14px' fontWeight='700'>
				{sum}
			</Text>
			<Button variant='action' px='24px' onClick={action} fontSize='sm' fontWeight='700'>
				{actionName}
			</Button>
		</Flex>
	);
}
