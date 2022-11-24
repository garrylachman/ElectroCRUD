import { Box, Button, Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import { SearchBar } from 'renderer/components/navbar/searchBar/SearchBar';
import Map from 'react-map-gl';

// Assets
import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationOn } from 'react-icons/md';
import { IoPaperPlane } from 'react-icons/io5';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2ltbW1wbGUiLCJhIjoiY2wxeG1hd24xMDEzYzNrbWs5emFkdm16ZiJ9.q9s0sSKQFFaT9fyrC-7--g'; // Set your mapbox token her

export default function YourTransfers(props: { [x: string]: any }) {
	const { ...rest } = props;
	const mapStyles = useColorModeValue(
		'mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0',
		'mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5'
	);
	// Chakra color mode
	const brand = useColorModeValue('brand.500', 'brand.400');
	const inputBg = useColorModeValue({ base: 'secondaryGray.300', md: 'white' }, { base: 'navy.700', md: 'navy.900' });
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'white');
	const dash = useColorModeValue('234318FFFF', '237551FFFF');
	return (
		<Card
			justifyContent='center'
			position='relative'
			flexDirection='column'
			w='100%'
			p='20px'
			zIndex='0'
			minH={{ base: '600px', lg: '100%' }}
			{...rest}>
			<Flex
				direction='column'
				position={{ base: 'unset', md: 'absolute' }}
				p={{ base: '0', md: '20px' }}
				w={{ base: '100%', md: 'calc(100% - 40px)' }}
				h='calc(100% - 40px)'
				zIndex='1'>
				<SearchBar
					w={{ base: '100%', md: '292px' }}
					placeholder='Search your next destination'
					bg={inputBg}
					mb='auto'
				/>
				<Flex
					w='100%'
					mt={{ base: '12px', md: '0px' }}
					direction={{ base: 'row', md: 'row' }}
					align={{ base: 'end', md: 'unset' }}
					mb={{ base: '20px', md: '0px' }}>
					<Flex
						position='relative'
						bg={inputBg}
						w={{ base: 'calc( 100% - 50px )', md: 'max-content' }}
						borderRadius='30px'
						p={{ base: '30px', md: '30px' }}
						mt='auto'>
						<Flex
							position='absolute'
							zIndex={1.1}
							h='calc(100% - 60px)'
							w='2px'
							left='36.5px'
							bgImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%${dash}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");`}
						/>
						<Flex w='100%' direction='column' me={{ base: '20px', md: '40px' }}>
							<Flex mb='50px' w={{ base: '100%', md: '100%' }} h='max-content' zIndex='2'>
								<Box
									me='14px'
									border='3px solid'
									borderColor={brand}
									bg={inputBg}
									h='16px'
									w='16px'
									borderRadius='50%'
								/>
								<Text w='max-content' color={textColorSecondary} fontSize='md' fontWeight='500'>
									Your location
								</Text>
							</Flex>
							<Flex w='100%' h='max-content' zIndex='2' ms='-4px' bg={inputBg}>
								<Icon color={brand} as={MdLocationOn} me='10px' w='24px' h='24px' />
								<Text minW='max-content' color={textColorSecondary} fontSize='md' fontWeight='500'>
									W. Street 253
								</Text>
							</Flex>
						</Flex>
						<Flex direction='column'>
							<Flex mb='16px' w='100%' direction='column' h='max-content' zIndex='2'>
								<Text w='max-content' color={textColorSecondary} fontSize='sm' fontWeight='500'>
									Distance
								</Text>
								<Text
									w='max-content'
									color={textColorSecondary}
									fontSize='lg'
									lineHeight='100%'
									fontWeight='500'>
									34 km
								</Text>
							</Flex>
							<Flex w='100%' direction='column' h='max-content' zIndex='2' ms='-4px'>
								<Text w='max-content' color={textColorSecondary} fontSize='sm' fontWeight='500'>
									Time
								</Text>
								<Text
									w='max-content'
									color={textColorSecondary}
									fontSize='lg'
									lineHeight='100%'
									fontWeight='500'>
									20 min
								</Text>
							</Flex>
						</Flex>
					</Flex>
					<Button
						borderRadius='50%'
						ms={{ base: '14px', md: 'auto' }}
						bg='white'
						w={{ base: '45px', md: '70px' }}
						h={{ base: '45px', md: '70px' }}
						minW={{ base: '45px', md: '70px' }}
						minH={{ base: '45px', md: '70px' }}
						variant='no-hover'>
						<Icon
							as={IoPaperPlane}
							color='secondaryGray.700'
							w={{ base: '18px', md: '25px' }}
							h={{ base: '18px', md: '25px' }}
						/>
					</Button>
				</Flex>
			</Flex>
			<Map
				initialViewState={{
					latitude: 37.692,
					longitude: -122.435,
					zoom: 13
				}}
				style={{ borderRadius: '20px', width: '100%', minHeight: '600px' }}
				mapStyle={mapStyles}
				mapboxAccessToken={MAPBOX_TOKEN}
			/>
		</Card>
	);
}
