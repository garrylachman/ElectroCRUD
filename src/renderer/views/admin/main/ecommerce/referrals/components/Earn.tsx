// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import IconBox from 'renderer/components/icons/IconBox';
import { DashCurveDown, DashCurveUp } from 'renderer/components/icons/Icons';

// Assets
import { MdCheckCircle, MdComment, MdPersonAddAlt1 } from 'react-icons/md';

export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const dashColor = useColorModeValue('brand.500', 'whiteAlpha.500');
	const shadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	const completeShadow = useColorModeValue(
		'0px 18px 40px rgba(112, 144, 176, 0.12)',
		'inset 0px 4px 4px rgba(255, 255, 255, 0.2)'
	);
	const boxBg = useColorModeValue('white', 'linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)');
	return (
		<Card p='30px' w='100%' {...rest}>
			<Text color={textColor} fontSize='2xl' fontWeight='700' mb='10px'>
				Earn with Horizon UI
			</Text>
			<Text color='secondaryGray.600' fontSize='md' fontWeight='400' mb='70px'>
				Invite your friends to Horizon, if they sign up, you and your friend will get 2 premium features for
				free!
			</Text>
			<Flex position='relative' direction={{ base: 'column', md: 'row' }} justifyContent='center'>
				<DashCurveUp
					left={{
						base: '154px',
						lg: '220px',
						xl: '275px',
						'2xl': '185px',
						'3xl': '275px'
					}}
					position='absolute'
					color={dashColor}
					w={{ base: '100px', lg: '132px' }}
					display={{ base: 'none', md: 'flex' }}
					h='22px'
				/>
				<DashCurveDown
					right={{
						base: '154px',
						lg: '220px',
						xl: '275px',
						'2xl': '185px',
						'3xl': '275px'
					}}
					top='60px'
					position='absolute'
					color={dashColor}
					w={{ base: '100px', lg: '132px' }}
					display={{ base: 'none', md: 'flex' }}
					h='22px'
				/>
				<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdComment} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
						Send Invitation
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Send your referral link to friends and tell them how useful Horizon is!
					</Text>
				</Flex>
				<Flex mx='60px' direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdPersonAddAlt1} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
						Registration
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						Let your friends register to our services using your persoal referral code!
					</Text>
				</Flex>
				<Flex direction='column' align='center' justify='center'>
					<IconBox
						mb='16px'
						w='100px'
						h='100px'
						bg={boxBg}
						shadow={shadow}
						boxShadow={completeShadow}
						icon={<Icon w='38px' h='38px' as={MdCheckCircle} color={brandColor} />}
					/>
					<Text textAlign='center' color={textColor} fontSize='xl' fontWeight='700' mb='10px'>
						Use Horizon for Free!
					</Text>
					<Text
						textAlign='center'
						color='secondaryGray.600'
						fontSize='md'
						fontWeight='400'
						maxW='278px'
						mb='70px'>
						You and your friends get 2 premium Horizon features for free!
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
