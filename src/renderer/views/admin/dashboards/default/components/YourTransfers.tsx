// Chakra imports
import { Button, Icon, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Transfer from 'renderer/components/dataDisplay/Transfer';
// Assets
import avatar1 from 'renderer/assets/img/avatars/avatar1.png';
import avatar2 from 'renderer/assets/img/avatars/avatar2.png';
import avatar3 from 'renderer/assets/img/avatars/avatar3.png';
import avatar4 from 'renderer/assets/img/avatars/avatar4.png';
import { BsArrowRight } from 'react-icons/bs';

export default function YourTransfers(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	return (
		<Card
			justifyContent='center'
			flexDirection='column'
			w='100%'
			mb={{ base: '20px', lg: '0px' }}
			pb='20px'
			{...rest}>
			<Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%' mb='26px'>
				Your Transfers
			</Text>
			<Transfer mb='20px' name='From Alex Manda' date='Today, 16:36' sum='+$50' avatar={avatar1} />
			<Transfer mb='20px' name='To Laura Santos' date='Today, 08:49' sum='-$27' avatar={avatar2} />
			<Transfer mb='20px' name='From Jadon S.' date='Yesterday, 14:36' sum='+$157' avatar={avatar3} />
			<Transfer mb='20px' name='From Esthera J.' date='Yesterday, 09:42' sum='+$92' avatar={avatar4} />

			<Button p='0px' ms='auto' variant='no-hover' bg='transparent' my={{ sm: '1.5rem', lg: '0px' }}>
				<Text
					fontSize='sm'
					color={brandColor}
					fontWeight='bold'
					cursor='pointer'
					transition='all .3s ease'
					my={{ sm: '1.5rem', lg: '0px' }}
					_hover={{ me: '4px' }}>
					View all
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
		</Card>
	);
}
