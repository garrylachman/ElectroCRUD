// Chakra imports
import { Badge, Icon, Flex, Button, Text } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import { VSeparator } from 'renderer/components/separator/Separator';

// Assets
import { MdShare, MdEdit, MdDownload } from 'react-icons/md';
import InvoiceBg from 'renderer/assets/img/account/InvoiceBg.png';

export default function Banner(props: {
	illustration?: string | JSX.Element;
	focused?: boolean;
	title?: string;
	value?: string;
	detail?: string;
	[x: string]: any;
}) {
	const { illustration, focused, title, value, detail, ...rest } = props;

	// Chakra Color Mode
	const bgButton = 'rgba(255,255,255,0.12)';
	const bgHover = { bg: 'whiteAlpha.50' };
	const bgFocus = { bg: 'rgba(255,255,255,0.12)' };

	return (
		<Card
			backgroundImage={InvoiceBg}
			backgroundRepeat='no-repeat'
			bgSize='cover'
			bgPosition='10%'
			p={{ base: '20px', md: '60px' }}
			pt={{ base: '40px', md: '75px' }}
			pb='140px'>
			<Flex>
				<Badge
					w='max-content'
					mb='10px'
					fontSize='sm'
					bg='rgba(255,255,255,0.12)'
					color='white'
					fontWeight='bold'>
					PAID INVOICE
				</Badge>
				<Button
					ms='auto'
					me='10px'
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					p='7px'
					minW='unset'
					h='32px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdEdit} color='white' w='18px' h='18px' />
				</Button>
				<Button
					alignItems='center'
					me='10px'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					p='7px'
					minW='unset'
					h='32px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdDownload} color='white' w='18px' h='18px' />
				</Button>
				<Button
					alignItems='center'
					justifyContent='center'
					bg='linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)'
					_hover={{
						bg: 'linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)'
					}}
					_focus={{
						bg: 'linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)'
					}}
					_active={{
						bg: 'linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)'
					}}
					p='7px'
					minW='unset'
					h='32px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdShare} color='white' w='18px' h='18px' />
				</Button>
			</Flex>
			<Flex mb={{ base: '0px', md: '50px' }} direction={{ base: 'column', md: 'row' }}>
				<Flex direction='column' color='white' h='100%' w='100%' mb={{ base: '20px', md: '0px' }}>
					<Text
						mt={{ base: '10px', md: '0px' }}
						fontSize={{ base: '2xl', md: '32px', lg: '44px', xl: '44px' }}
						fontWeight='bold'>
						Invoice #03941
					</Text>
					<Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='regular'>
						IV BYP 9428 99
					</Text>
				</Flex>
				<VSeparator
					bg='whiteAlpha.300'
					mx={{ base: '10px', md: '40px' }}
					display={{ base: 'none', md: 'flex' }}
				/>
				<Flex direction='column' color='white' h='100%' w='100%'>
					<Text fontSize={{ base: 'md', md: 'xl' }} mt={{ base: '10px', md: '0px' }} fontWeight='regular'>
						2845 Main Street
					</Text>
					<Text fontSize={{ base: 'md', md: 'xl' }} fontWeight='regular'>
						Lakewood, California
					</Text>
					<Text fontSize={{ base: 'md', md: 'xl' }} fontWeight='regular'>
						United States 48207
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
