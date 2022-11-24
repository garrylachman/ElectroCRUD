import React, { useState } from 'react';

// Chakra imports
import {
	Flex,
	Box,
	Button,
	IconButton,
	Icon,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useColorModeValue
} from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Mastercard from 'renderer/components/card/Mastercard';
// Assets
import { MdAddCircle, MdCached, MdAdd, MdAttachMoney, MdMoreHoriz } from 'react-icons/md';

export default function YourCard(props: { [x: string]: any }) {
	const { ...rest } = props;

	let [ tabState, setTabState ] = useState('card1');

	// Chakra Color Mode
	const iconColor = useColorModeValue('brand.500', 'white');
	const greenIcon = useColorModeValue('green.500', 'white');
	const redIcon = useColorModeValue('red.500', 'white');
	const yellowIcon = useColorModeValue('yellow.500', 'white');
	const bgIconButton = useColorModeValue('white', 'whiteAlpha.100');
	const bgIconHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgIconFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const shadow = useColorModeValue('18px 17px 40px 4px rgba(112, 144, 176, 0.1)', 'unset');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card {...rest} p='34px'>
			<Flex justify='space-between' mb='25px' align='center'>
				<Text color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Your Card
				</Text>
				<Button
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdAddCircle} color={iconColor} w='24px' h='24px' />
				</Button>
			</Flex>
			<Tabs>
				<TabPanels mb='20px'>
					<TabPanel p='0px'>
						<Mastercard number='7812 XXXX XXXX XXXX' cvv='09X' exp='05/24' />
					</TabPanel>
					<TabPanel p='0px'>
						<Mastercard number='1275 XXXX XXXX XXXX' cvv='12X' exp='02/23' />
					</TabPanel>
					<TabPanel p='0px'>
						<Mastercard number='2371 XXXX XXXX XXXX' cvv='73X' exp='01/27' />
					</TabPanel>
				</TabPanels>
				<TabList
					mb='20px'
					mx={{ base: '10px', lg: '30px' }}
					overflowX={{ sm: 'unset', lg: 'unset' }}
					border='0px solid transparent'>
					<Flex justify='center' w='100%'>
						<Tab
							p='0px'
							flexDirection='column'
							onClick={function() {
								setTabState('card1');
							}}
							me='18px'
							bg='unset'
							_selected={{
								bg: 'none'
							}}
							_focus={{ border: 'none' }}
							border='0px solid transparent !important'
							_active={{ bg: 'none' }}
							minW='max-content'>
							<Box
								w='8px'
								height='8px'
								transition='0.1s linear'
								bg={tabState === 'card1' ? 'brand.500' : 'secondaryGray.500'}
								borderRadius='50%'
							/>
						</Tab>
						<Tab
							p='0px'
							flexDirection='column'
							onClick={function() {
								setTabState('card2');
							}}
							me='18px'
							bg='unset'
							_selected={{
								bg: 'none'
							}}
							_focus={{ border: 'none' }}
							border='0px solid transparent !important'
							_active={{ bg: 'none' }}
							minW='max-content'>
							<Box
								w='8px'
								height='8px'
								transition='0.1s linear'
								bg={tabState === 'card2' ? 'brand.500' : 'secondaryGray.500'}
								borderRadius='50%'
							/>
						</Tab>
						<Tab
							p='0px'
							flexDirection='column'
							onClick={function() {
								setTabState('card3');
							}}
							bg='unset'
							_selected={{
								bg: 'none',
								border: 'none'
							}}
							_focus={{ border: 'none' }}
							border='0px solid transparent !important'
							_active={{ bg: 'none' }}
							minW='max-content'>
							<Box
								w='8px'
								height='8px'
								transition='0.1s linear'
								bg={tabState === 'card3' ? 'brand.500' : 'secondaryGray.500'}
								borderRadius='50%'
							/>
						</Tab>
					</Flex>
				</TabList>
			</Tabs>
			<Flex direction='column' bg={boxBg} p='16px 20px' borderRadius='14px' mb='38px'>
				<Text fontSize='sm' fontWeight='700' color={textColor}>
					Use for added security online
				</Text>
				<Text fontSize='sm' fontWeight='500' color='secondaryGray.600'>
					The card number is refreshed automatically after each use. Each number cand be used only once.
				</Text>
			</Flex>
			<Flex justify='space-between' w='100%'>
				<Flex direction='column' align='center' me={{ base: '16px', md: '0px', '2xl': '36px' }}>
					<IconButton
						aria-label='transfer'
						borderRadius='50%'
						bg={bgIconButton}
						_hover={bgIconHover}
						_active={bgIconFocus}
						_focus={bgIconFocus}
						w='56px'
						h='56px'
						mb='5px'
						boxShadow={shadow}
						icon={<Icon as={MdCached} color={iconColor} w='24px' h='24px' />}
					/>
					<Text fontSize='sm' fontWeight='500' color={textColor}>
						Transfer
					</Text>
				</Flex>
				<Flex direction='column' align='center' me={{ base: '16px', md: '0px', '2xl': '36px' }}>
					<IconButton
						aria-label='top'
						borderRadius='50%'
						bg={bgIconButton}
						_hover={bgIconHover}
						_active={bgIconFocus}
						_focus={bgIconFocus}
						w='56px'
						h='56px'
						mb='5px'
						boxShadow={shadow}
						icon={<Icon as={MdAdd} color={yellowIcon} w='24px' h='24px' />}
					/>
					<Text fontSize='sm' fontWeight='500' color={textColor}>
						Top Up
					</Text>
				</Flex>
				<Flex direction='column' align='center' me={{ base: '16px', md: '0px', '2xl': '36px' }}>
					<IconButton
						aria-label='bills'
						borderRadius='50%'
						bg={bgIconButton}
						_hover={bgIconHover}
						_active={bgIconFocus}
						_focus={bgIconFocus}
						w='56px'
						h='56px'
						mb='5px'
						boxShadow={shadow}
						icon={<Icon as={MdAttachMoney} color={greenIcon} w='24px' h='24px' />}
					/>
					<Text fontSize='sm' fontWeight='500' color={textColor}>
						Pay Bills
					</Text>
				</Flex>
				<Flex direction='column' align='center'>
					<IconButton
						aria-label='more'
						borderRadius='50%'
						bg={bgIconButton}
						_hover={bgIconHover}
						_active={bgIconFocus}
						_focus={bgIconFocus}
						w='56px'
						h='56px'
						mb='5px'
						boxShadow={shadow}
						icon={<Icon as={MdMoreHoriz} color={redIcon} w='24px' h='24px' />}
					/>
					<Text fontSize='sm' fontWeight='500' color={textColor}>
						More
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
