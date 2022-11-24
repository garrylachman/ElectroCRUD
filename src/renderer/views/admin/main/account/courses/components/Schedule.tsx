// Chakra imports
import { Button, Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Event from 'renderer/components/dataDisplay/Event';
// Assets
import { BsArrowRight } from 'react-icons/bs';

export default function Schedule(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const borderColor = useColorModeValue('transparent', 'whiteAlpha.100');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Card
			border='1px solid'
			borderColor={borderColor}
			justifyContent='center'
			flexDirection='column'
			w='100%'
			pb='20px'
			{...rest}>
			<Flex align='center' mb='20px'>
				<Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%'>
					Schedule
				</Text>
				<Button p='0px' ms='auto' variant='no-hover' bg='transparent'>
					<Text
						fontSize='sm'
						color={brandColor}
						fontWeight='bold'
						cursor='pointer'
						transition='all .3s ease'
						_hover={{ me: '4px' }}>
						View all Tasks
					</Text>
					<Icon
						as={BsArrowRight}
						w='18px'
						h='18px'
						color={brandColor}
						transition='all .3s ease'
						ms='.3rem'
						cursor='pointer'
						_hover={{ transform: 'translate(4px)' }}
					/>
				</Button>
			</Flex>
			<Event bg={boxBg} name='UX/UI Workshop' time='01:00 PM - 02:00 PM' mb='10px' />
			<Event name='Product Design Course' time='02:00 PM - 03:25 PM' mb='10px' />
			<Event name='Design Strategy Workshop' time='03:00 PM - 04:00 PM' mb='10px' />
		</Card>
	);
}
