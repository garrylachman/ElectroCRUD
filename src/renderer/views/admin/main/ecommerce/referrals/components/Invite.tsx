// Chakra imports
import { Flex, Icon, IconButton, Input, Text, useToast, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';

import { IoLogoFacebook, IoLogoTwitter } from 'react-icons/io';
// Assets
import { IoPaperPlane } from 'react-icons/io5';

export default function Conversion(props: { referralCode: string; fbLink: string; twtLink: string; [x: string]: any }) {
	const { referralCode, fbLink, twtLink, ...rest } = props;
	const toast = useToast();

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Card px='26px' py='30px' w='100%' {...rest}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='10px'>
				Invite your friends!
			</Text>
			<Text color='secondaryGray.600' fontSize='md' fontWeight='400' mb='30px'>
				Add your friends email addresses and sent them invitations to join!
			</Text>
			<Flex position='relative' mb='60px'>
				<Input
					h='50px'
					variant='main'
					borderRadius='65px'
					placeholder='Email addresses...'
					_placeholder={{ color: 'secondaryGray.500' }}
				/>
				<IconButton
					aria-label='share'
					w='40px'
					h='40px'
					variant='brand'
					borderRadius='50%'
					position='absolute'
					top='5px'
					right='6px'>
					<Icon w='14px' h='14px' as={IoPaperPlane} color='white' />
				</IconButton>
			</Flex>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='10px'>
				Share the referral link
			</Text>
			<Text color='secondaryGray.600' fontSize='md' fontWeight='400' mb='30px'>
				You can also share your referral link by copying and sending it to your friends or sharing it on social
				media.
			</Text>
			<Flex>
				<Flex
					w={{ base: '74%', md: '100%', '2xl': '75%', '3xl': '378px' }}
					px='18px'
					align='center'
					borderRadius='50px'
					cursor='pointer'
					onClick={function() {
						navigator.clipboard.writeText(referralCode);
						toast({
							title: `Invite link copied!`,
							position: 'top',
							status: 'success',
							isClosable: true
						});
					}}
					bg={boxBg}
					me='6px'>
					<Text
						fontSize='sm'
						fontWeight='500'
						color={textColor}
						w={{ base: '60%', md: '85%', '2xl': '68%', '3xl': '80%' }}>
						{referralCode}
					</Text>
					<Text ms='auto' color={iconColor} fontSize='sm' fontWeight='500'>
						Copy link
					</Text>
				</Flex>
				<IconButton aria-label='facebook' me='6px' bg={boxBg} borderRadius='50%'>
					<Icon w='22px' h='22px' as={IoLogoFacebook} color={iconColor} />
				</IconButton>
				<IconButton aria-label='twitter' bg={boxBg} borderRadius='50%'>
					<Icon w='18px' h='18px' as={IoLogoTwitter} color={iconColor} />
				</IconButton>
			</Flex>
		</Card>
	);
}
