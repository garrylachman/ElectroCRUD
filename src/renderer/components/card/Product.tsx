// Chakra imports
import { Badge, Button, Flex, Icon, Image, Link, Text } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
// Custom icons
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdDateRange, MdDownload, MdCancel } from 'react-icons/md';

export default function Default(props: {
	image: string;
	name: string;
	status: string;
	date: string;
	downloads: string;
	type: 'PRO' | 'free';
	edit: string;
	reviews: string;
}) {
	const { image, name, status, date, downloads, type, edit, reviews } = props;

	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column', '2xl': 'row' }}>
				<Image
					src={image}
					w={{ base: '100%', '2xl': '188px', '3xl': '100%' }}
					h={{ base: '100%', '2xl': '178px', '3xl': '100%' }}
					borderRadius='20px'
					me='30px'
					mb={{ base: '30px', '2xl': '0px' }}
				/>
				<Flex
					flexDirection='column'
					h='100%'
					align={{ base: 'center', '2xl': 'start' }}
					justify={{ base: 'center' }}>
					<Flex mb='25px' align='center'>
						<Text
							color='navy.700'
							fontWeight='bold'
							fontSize={{
								base: '18px',
								md: '18px',
								lg: '24px',
								xl: 'lg',
								'2xl': '24px'
							}}
							me='14px'>
							{name}
						</Text>
						<Badge
							display='flex'
							justifyContent='center'
							alignItems='center'
							borderRadius='70px'
							p={{ base: '0px 14px', '2xl': '0px 18px' }}
							h='26px'
							fontSize='xs'
							fontWeight='bold'
							color='white'
							bg={
								type.toLowerCase() === 'pro' ? (
									'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								) : (
									'#01B574'
								)
							}>
							{type}
						</Badge>
					</Flex>
					<Flex
						mb='30px'
						flexWrap='wrap'
						justify={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start'
						}}
						align={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start'
						}}>
						<Flex align='center' me={{ base: '8px', lg: '16px' }}>
							<Icon
								mt='2px'
								h='18px'
								w='18px'
								color={status.toLowerCase() === 'approved' ? 'green.500' : 'red.500'}
								as={status.toLowerCase() === 'approved' ? IoCheckmarkCircle : MdCancel}
								me='8px'
							/>
							<Text color='navy.700' fontSize={{ base: 'sm', '2xl': 'md' }}>
								{status}
							</Text>
						</Flex>
						<Flex align='center' me={{ base: '8px', lg: '0px', xl: '16px' }}>
							<Icon as={MdDateRange} h='18px' w='18px' color='navy.700' me='8px' />
							<Text color='navy.700' fontSize={{ base: 'sm', '2xl': 'md' }}>
								{date}
							</Text>
						</Flex>
						<Flex
							align='center'
							mt={{
								base: '4px',
								md: '0px',
								lg: '4px',
								xl: '0px'
							}}>
							<Icon as={MdDownload} h='18px' w='18px' color='navy.700' me='8px' />
							<Text color='navy.700' fontSize={{ base: 'sm', '2xl': 'md' }}>
								{downloads}
							</Text>
						</Flex>
					</Flex>
					<Link href={edit} w={{ base: '100%', '2xl': 'unset' }}>
						<Button
							w={{ base: '100%', '2xl': '380px' }}
							h='40px'
							color='white'
							bg='brand.800'
							fontSize='sm'
							fontWeight='500'
							_hover={{ bg: 'brand.700' }}
							_active={{ bg: 'brand.800' }}
							_focus={{ bg: 'brand.800' }}
							borderRadius='16px'
							mb='15px'>
							Edit Product
						</Button>
					</Link>
					<Link href={reviews} w={{ base: '100%', '2xl': 'unset' }}>
						<Button
							w={{ base: '100%', '2xl': '380px' }}
							h='40px'
							color='navy.700'
							fontSize='sm'
							fontWeight='500'
							border='1px solid'
							borderColor='gray.200'
							bg='transparent'
							_hover={{ bg: 'gray.100' }}
							_active={{ bg: 'transparent' }}
							_focus={{ bg: 'transparent' }}
							borderRadius='16px'
							mb='15px'>
							View Reviews
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Card>
	);
}
