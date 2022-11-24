// Chakra imports
import { Flex, Box, Icon, Text, Spacer } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';

// Assets
import bgMastercard from 'renderer/assets/img/dashboards/Debit.png';
import { RiMastercardFill } from 'react-icons/ri';

export default function Banner(props: { exp: string; cvv: string; number: string }) {
	const { exp, cvv, number, ...rest } = props;

	// Chakra Color Mode
	return (
		<Card
			backgroundImage={bgMastercard}
			backgroundRepeat='no-repeat'
			boxShadow='0px 32px 41px -18px rgba(242, 134, 134, 0.4)'
			bgSize='cover'
			alignSelf='center'
			w={{ base: '100%', md: '60%', xl: '99%' }}
			bgPosition='10%'
			mx='auto'
			p='20px'
			{...rest}>
			<Flex direction='column' color='white' h='100%' w='100%'>
				<Flex justify='space-between' align='center' mb='37px'>
					<Text fontSize='2xl' fontWeight='bold'>
						Glassy.
					</Text>
					<Icon as={RiMastercardFill} w='48px' h='auto' color='white' />
				</Flex>
				<Spacer />
				<Flex direction='column'>
					<Box>
						<Text fontSize={{ sm: 'xl', lg: 'lg', xl: 'xl' }} fontWeight='bold'>
							{number}
						</Text>
					</Box>
					<Flex mt='14px'>
						<Flex direction='column' me='34px'>
							<Text fontSize='xs'>VALID THRU</Text>
							<Text fontSize='sm' fontWeight='500'>
								{exp}
							</Text>
						</Flex>
						<Flex direction='column'>
							<Text fontSize='xs'>CVV</Text>
							<Text fontSize='sm' fontWeight='500'>
								{cvv}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
