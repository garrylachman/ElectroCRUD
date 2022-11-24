/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from 'react';

// Chakra imports
import {
	Box,
	Flex,
	Icon,
	Text,
	useColorModeValue,
	SimpleGrid,
	Grid,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel
} from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Course from 'renderer/components/card/Course';
import MiniCalendar from 'renderer/components/calendar/MiniCalendar';
import Hours from 'renderer/views/admin/main/account/courses/components/Hours';
import Schedule from 'renderer/views/admin/main/account/courses/components/Schedule';
// Assets
import { IoLogoInstagram } from 'react-icons/io5';
import { MdOutlineUpgrade } from 'react-icons/md';
import { EthereumLogoOutline } from 'renderer/components/icons/Icons';
import { VSeparator } from 'renderer/components/separator/Separator';
export default function Courses() {
	let [ tabState, setTabState ] = useState('all');

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	let panelExample = (
		<SimpleGrid columns={1} gap='20px'>
			<Course
				bgBox='linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
				icon={<Icon as={IoLogoInstagram} color='white' w='100px' h='100px' />}
				title='Instagram Marketing 2022: Complete Guide To Growth'
				desc='Attract Hyper-Targeted Instagram Followers, Convert Followers to Paying Customers, & Expand your Brand Using Instagram'
				day='Mon'
				date='January 05'
				topics={[ 'Social Media Marketing', 'Instagram Marketing' ]}
				time='1h 30 min'
			/>
			<Course
				bgBox='linear-gradient(292.37deg, #92FE9D 10.84%, #00C9FF 95.27%)'
				icon={<Icon as={MdOutlineUpgrade} color='white' w='100px' h='100px' />}
				title='SEO 2022: Complete SEO Training + SEO for Websites'
				desc='Competitor, Keyword Research, Content, Technical SEO, Core Web Vitals, Page speed, Backlinks, UX SEO :WordPress Training'
				day='Fri'
				date='February 23'
				topics={[ 'SEO Training', 'Website SEO 2022' ]}
				time='4h 45 min'
			/>
			<Course
				bgBox='linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)'
				icon={<EthereumLogoOutline color='white' w='80px' h='80px' />}
				title='Solidity & Ethereum in React (Next JS): The Complete Guide'
				desc='Create real Smart Contracts in Solidity and DApps with React & Next JS. Understand how the Ethereum blockchain works'
				day='Wed'
				date='March 02'
				topics={[ 'Blockchain', 'Ethereum', 'ReactJS' ]}
				time='8h 05 min'
			/>
		</SimpleGrid>
	);
	// Chakra Color Mode
	return (
		<Grid
			pt={{ base: '130px', md: '80px', xl: '80px' }}
			gridTemplateColumns={{ md: '2.15fr 1fr', xl: '2.95fr 1fr' }}
			display={{ base: 'block', lg: 'grid' }}>
			<Flex gridArea='1 / 1 / 2 / 2' display={{ base: 'block', lg: 'flex' }}>
				<Tabs variant='soft-rounded' colorScheme='brandTabs'>
					<TabList mx={{ base: '10px', lg: '30px' }} overflowX={{ sm: 'scroll', lg: 'unset' }}>
						<Flex>
							<Tab
								pb='0px'
								flexDirection='column'
								onClick={function() {
									setTabState('all');
								}}
								me='10px'
								bg='unset'
								_selected={{
									bg: 'none'
								}}
								_focus={{ border: 'none' }}
								minW='max-content'>
								<Flex align='center'>
									<Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
										All
									</Text>
									<Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
										0
									</Text>
								</Flex>
								<Box
									height='4px'
									w='100%'
									transition='0.1s linear'
									bg={tabState === 'all' ? 'brand.500' : 'transparent'}
									mt='15px'
									borderRadius='30px'
								/>
							</Tab>
							<Tab
								onClick={function() {
									setTabState('upcoming');
								}}
								pb='0px'
								me='10px'
								bg='unset'
								_selected={{
									bg: 'none'
								}}
								_focus={{ border: 'none' }}
								minW='max-content'
								flexDirection='column'>
								<Flex align='center'>
									<Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
										Upcoming
									</Text>
									<Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
										4
									</Text>
								</Flex>
								<Box
									height='4px'
									w='100%'
									transition='0.1s linear'
									bg={tabState === 'upcoming' ? 'brand.500' : 'transparent'}
									mt='15px'
									borderRadius='30px'
								/>
							</Tab>
							<Tab
								pb='0px'
								flexDirection='column'
								onClick={function() {
									setTabState('active');
								}}
								bg='unset'
								_selected={{
									bg: 'none'
								}}
								_focus={{ border: 'none' }}
								minW='max-content'>
								<Flex align='center'>
									<Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
										Active
									</Text>
									<Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
										12
									</Text>
								</Flex>
								<Box
									height='4px'
									w='100%'
									transition='0.1s linear'
									bg={tabState === 'active' ? 'brand.500' : 'transparent'}
									mt='15px'
									borderRadius='30px'
								/>
							</Tab>
						</Flex>
					</TabList>
					<TabPanels>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
						<TabPanel px='0px'>{panelExample}</TabPanel>
					</TabPanels>
				</Tabs>
				<VSeparator mx='30px' h='100%' />
			</Flex>
			<Card alignItems='center' flexDirection='column' gridArea='1 / 2 / 2 / 3' w='100%'>
				<Grid
					templateColumns={{ md: 'repeat(2, 1fr)', lg: '1fr' }}
					display={{ base: 'block', '3xl': 'grid' }}
					gridColumnGap='20px'>
					<MiniCalendar
						gridArea={{ md: '1 / 1 / 2 / 2;', lg: '1 / 1 / 2 / 2' }}
						selectRange={false}
						mb='20px'
					/>
					<Schedule gridArea={{ md: '1 / 2 / 2 / 3', lg: '2 / 1 / 3 / 2' }} mb='20px' />
					<Hours gridArea={{ md: '2 / 1 / 3 / 3', lg: '3 / 1 / 4 / 2' }} />
				</Grid>
			</Card>
		</Grid>
	);
}
