// Chakra imports
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import SessionBadge from 'renderer/components/dataDisplay/SessionBadge';

export default function Sessions(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
	// Chakra Color Mode
	return (
		<FormControl>
			<Card p='30px' {...rest}>
				<Flex justify='space-between' align='center'>
					<Text fontSize='2xl' color={textColorPrimary} fontWeight='bold'>
						Sessions
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing={{ base: '20px', xl: '0px' }}>
					<SessionBadge
						py='25px'
						borderBottom='1px solid'
						borderColor={borderColor}
						detail='EU'
						name='Chrome, Bucharest 68.128.072.301'
						status='Enabled'
						color='green'
					/>
					<SessionBadge
						py='25px'
						borderBottom='1px solid'
						borderColor={borderColor}
						detail='US'
						name='Chrome MacOS (Your current session)'
						status='Enabled'
						color='green'
					/>
					<SessionBadge
						py='25px'
						borderBottom='1px solid'
						borderColor={borderColor}
						detail='EU'
						name='Firefox on Desktop, Barcelona'
						status='Enabled'
						color='green'
					/>
					<SessionBadge pt='25px' detail='US' name='Safari on Iphone' status='Disable' color='red' />
				</SimpleGrid>
			</Card>
		</FormControl>
	);
}
