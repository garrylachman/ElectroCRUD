// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import IconBox from 'renderer/components/icons/IconBox';

export default function Transaction(props: {
	date: string;
	sum: string;
	icon: JSX.Element;
	name: string;
	[x: string]: any;
}) {
	const { date, sum, icon, name, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconBoxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' {...rest}>
			<IconBox h='42px' w='42px' bg={iconBoxBg} me='20px' icon={icon} />
			<Flex direction='column' align='start' me='auto'>
				<Text color={textColor} fontSize='sm' me='6px' fontWeight='700'>
					{name}
				</Text>
				<Text color='secondaryGray.600' fontSize='xs' fontWeight='500'>
					{date}
				</Text>
			</Flex>
			<Text ms='auto' color={textColor} fontSize='sm' me='6px' fontWeight='700'>
				{sum}
			</Text>
		</Flex>
	);
}
