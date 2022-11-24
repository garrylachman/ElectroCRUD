// Chakra imports
import { Button, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Transfer from 'renderer/components/dataDisplay/Transfer';
// Assets
import avatar1 from 'renderer/assets/img/avatars/avatar1.png';
import avatar2 from 'renderer/assets/img/avatars/avatar2.png';
import avatar3 from 'renderer/assets/img/avatars/avatar3.png';
import avatar4 from 'renderer/assets/img/avatars/avatar4.png';
import avatar5 from 'renderer/assets/img/avatars/avatar5.png';
import avatar6 from 'renderer/assets/img/avatars/avatar6.png';
import avatar7 from 'renderer/assets/img/avatars/avatar7.png';

export default function YourTransfers(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	return (
		<Card flexDirection='column' w='100%' p='34px' pb='20px !important' {...rest}>
			<Text color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%' mb='26px'>
				Your Transfers
			</Text>
			<Transfer mb='26px' name='From Alex Manda' date='Today, 16:36' sum='+$50' avatar={avatar1} />
			<Transfer mb='26px' name='To Laura Santos' date='Today, 08:49' sum='-$27' avatar={avatar2} />
			<Transfer mb='26px' name='From Jadon S.' date='Yesterday, 14:36' sum='+$157' avatar={avatar3} />
			<Transfer mb='26px' name='From Esthera J.' date='Yesterday, 09:42' sum='+$92' avatar={avatar4} />
			<Transfer mb='26px' name='From Esthera J.' date='Yesterday, 09:42' sum='+$92' avatar={avatar5} />
			<Transfer mb='26px' name='From Alonso M.' date='Tuesday, 20:37' sum='-$32' avatar={avatar6} />
			<Transfer mb='26px' name='From Mark A.' date='Tuesday, 09:53' sum='+$87' avatar={avatar7} />

			<Button p='0px' ms='auto' variant='no-hover' bg='transparent' my={{ sm: '1.5rem', lg: '0px' }}>
				<Text
					fontSize='md'
					color={brandColor}
					fontWeight='bold'
					cursor='pointer'
					my={{ sm: '1.5rem', lg: '0px' }}>
					See all transfers
				</Text>
			</Button>
		</Card>
	);
}
