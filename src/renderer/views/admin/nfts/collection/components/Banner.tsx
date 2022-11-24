// Chakra imports
import { Flex, Icon, Image, Avatar, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import { VSeparator } from 'renderer/components/separator/Separator';

// Assets
import { MdVerified } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';

export default function Banner(props: {
	image: string;
	creator: string;
	name: string;
	items: number;
	owners: number;
	floor: number;
	volume: number;
	desc: string;
	profile: string;
}) {
	const { image, creator, name, items, owners, floor, volume, desc, profile } = props;

	// Chakra Color Mode
	const borderColor = useColorModeValue('white !important', '#0b1437 !important');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorLink = useColorModeValue('blue.500', 'white');
	return (
		<Flex mb={{ base: '20px', '2xl': '20px' }} justifyContent='center' align='center' direction='column' w='100%'>
			<Image
				src={image}
				w={{ base: '100%', '3xl': '100%' }}
				maxH={{ base: '100%', '3xl': '27.5vh' }}
				h={{ base: '140px', md: '100%' }}
				borderRadius='20px'
			/>
			<Avatar
				src={profile}
				h={{ xl: '170px' }}
				w={{ xl: '170px' }}
				border='10px solid'
				mt='-95px'
				mb='20px'
				borderColor={borderColor}
			/>
			<Text color={textColor} fontSize='54px' fontWeight='700' mb='15px' lineHeight='100%'>
				{name}
			</Text>
			<Flex align='center' mb='40px'>
				<Text color='secondaryGray.600' fontSize='lg' fontWeight='400'>
					Created by{' '}
					<Text as='span' color={textColorLink} fontSize='lg' fontWeight='500' me='4px'>
						{creator}
					</Text>
				</Text>
				<Icon as={MdVerified} h='16px' w='16px' color='blue.500' mt='3px' />
			</Flex>
			<Card maxW='100%' w='800px' py='40px' mb='40px'>
				<Flex w='100%' justify='center' direction={{ base: 'column', md: 'row' }}>
					<Flex
						direction='column'
						align='center'
						me={{ base: '0px', md: '60px' }}
						mb={{ base: '20px', md: '0px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{items}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Items
						</Text>
					</Flex>
					<VSeparator />
					<Flex
						direction='column'
						align='center'
						mx={{ base: '0px', md: '60px' }}
						mb={{ base: '20px', md: '0px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{owners}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Owners
						</Text>
					</Flex>
					<VSeparator />
					<Flex
						direction='column'
						align='center'
						mx={{ base: '0px', md: '30px', lg: '60px' }}
						mb={{ base: '20px', md: '0px' }}>
						<Flex me={{ base: '0px', md: '32px' }} align='center'>
							<Icon as={FaEthereum} color={textColor} width='17px' height='29px' me='8px' />
							<Text color={textColor} fontSize='36px' fontWeight='700'>
								{floor}
							</Text>
						</Flex>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Floor Price
						</Text>
					</Flex>
					<VSeparator />
					<Flex direction='column' align='center' ms={{ base: '0px', md: '60px' }}>
						<Flex me={{ base: '0px', md: '32px' }} align='center'>
							<Icon as={FaEthereum} color={textColor} width='17px' height='29px' me='8px' />
							<Text color={textColor} fontSize='36px' fontWeight='700'>
								{volume}
							</Text>
						</Flex>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Volume Traded
						</Text>
					</Flex>
				</Flex>
			</Card>
			<Text
				color={textColor}
				fontSize='lg'
				fontWeight='400'
				lineHeight='180%'
				w={{ base: '350px', md: '860px' }}
				maxW='100%'
				textAlign='center'
				mb={{ base: '0px', md: '60px' }}>
				{desc}
			</Text>
		</Flex>
	);
}
