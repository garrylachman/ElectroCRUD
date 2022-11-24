// Chakra imports
import { Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';

// Assets
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';

export default function Stock(props: {
	sum: string;
	icon?: JSX.Element;
	name: String;
	chart: JSX.Element;
	growth: string;
	[x: string]: any;
}) {
	const { sum, icon, name, chart, growth, ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Flex justifyContent='center' alignItems='center' w='100%' maxH='48px' overflow='hidden' {...rest}>
			<Flex direction='column' align='start' me='auto'>
				<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
					{name}
				</Text>
				<Flex align='center'>
					<Text color={textColor} fontSize='md' me='6px' fontWeight='700'>
						{sum}
					</Text>
					<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
						EUR
					</Text>
				</Flex>
			</Flex>
			<Flex width='120px' ms='auto' mt='30px'>
				{chart}
			</Flex>
			<Flex align='center'>
				{growth[0] === '-' ? (
					<Icon as={RiArrowDownSFill} color='red.500' />
				) : (
					<Icon as={RiArrowUpSFill} color='green.500' />
				)}

				<Text color={growth[0] === '-' ? 'red.500' : 'green.500'} fontSize='sm' ms='10px' fontWeight='700'>
					{growth}
				</Text>
			</Flex>
		</Flex>
	);
}
