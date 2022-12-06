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

// Chakra imports
import {
	Box,
	Button,
	Flex,
	SimpleGrid,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';
import TextField from 'renderer/components/fields/TextField';
import React, { useState } from 'react';
export default function NewUser() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const [ activeBullets, setActiveBullets ] = useState({
		user: true,
		address: false,
		profile: false
	});

	const userTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const addressTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const profileTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;

	return (
		<Flex direction='column' minH='100vh' align='center' pt={{ sm: '125px', lg: '75px' }} position='relative'>
			<Box
				h='45vh'
				bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
				position='absolute'
				w='100%'
				borderRadius='30px'
			/>

			<Tabs
				variant='unstyled'
				zIndex='0'
				mt={{ base: '60px', md: '165px' }}
				display='flex'
				flexDirection='column'>
				<TabList display='flex' alignItems='center' alignSelf='center' justifySelf='center'>
					<Tab
						ref={userTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								user: true,
								address: false,
								profile: false
							})}>
						<Flex
							direction='column'
							justify='center'
							align='center'
							position='relative'
							_before={{
								content: "''",
								width: { sm: '120px', md: '250px', lg: '300px' },
								height: '3px',
								bg: activeBullets.address ? 'white' : '#8476FF',
								left: { sm: '12px', md: '30px' },
								top: {
									sm: activeBullets.user ? '6px' : '4px',
									md: null
								},
								position: 'absolute',
								bottom: activeBullets.user ? '40px' : '38px',

								transition: 'all .3s ease'
							}}>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.user ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.user ? 'white' : 'gray.300'}
								fontWeight={activeBullets.user ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								User Info
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={addressTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								user: true,
								address: true,
								profile: false
							})}>
						<Flex
							direction='column'
							justify='center'
							align='center'
							position='relative'
							_before={{
								content: "''",
								width: { sm: '120px', md: '250px', lg: '300px' },
								height: '3px',
								bg: activeBullets.profile ? 'white' : '#8476FF',
								left: { sm: '12px', md: '32px' },
								top: '6px',
								position: 'absolute',
								bottom: activeBullets.address ? '40px' : '38px',

								transition: 'all .3s ease'
							}}>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.address ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.address ? 'white' : 'gray.300'}
								fontWeight={activeBullets.address ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								Address
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={profileTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								user: true,
								address: true,
								profile: true
							})}>
						<Flex direction='column' justify='center' align='center' position='relative'>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.profile ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.profile ? 'white' : 'gray.300'}
								fontWeight={activeBullets.profile ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								Profile
							</Text>
						</Flex>
					</Tab>
				</TabList>
				<TabPanels mt='24px' maxW={{ md: '90%', lg: '100%' }} mx='auto'>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								User Info
							</Text>
							<Flex direction='column' w='100%'>
								<Stack direction='column' spacing='20px'>
									<SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
										<InputField mb='0px' id='first' placeholder='eg. Esthera' label='First Name' />
										<InputField mb='0px' id='last' placeholder='eg. Peterson' label='Last Name' />
										<InputField mb='0px' id='Company' placeholder='eg. Simmmple' label='Company' />
										<InputField
											mb='0px'
											id='Email'
											placeholder='eg. hello@simmmple.com'
											label='Email Address'
										/>
										<InputField mb='0px' id='Password' placeholder='4030120241' label='Password' />
										<InputField
											mb='0px'
											id='Confirm'
											placeholder='4030120241'
											label='Confirm Password'
										/>
									</SimpleGrid>
								</Stack>
								<Flex justify='space-between' mt='24px'>
									<Button
										variant='darkBrand'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										ms='auto'
										onClick={() => addressTab.current.click()}>
										Next
									</Button>
								</Flex>
							</Flex>
						</Card>
					</TabPanel>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								Address
							</Text>
							<Flex direction='column' w='100%'>
								<Stack direction='column' spacing='20px' mb='20px'>
									<InputField
										mb='0px'
										id='add1'
										placeholder='eg. Main Street 203'
										label='Address Line 1'
									/>
									<InputField
										mb='0px'
										id='add2'
										placeholder='eg. Apartment, Floor'
										label='Address Line 2'
									/>
									<SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
										<InputField mb='0px' id='city' placeholder='eg. Miami' label='City' />
										<SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
											<InputField mb='0px' id='add2' placeholder='Florida' label='State' />
											<InputField
												mb='0px'
												id='zip'
												placeholder='eg. Apartment, Floor'
												label='ZIP'
											/>
										</SimpleGrid>
									</SimpleGrid>
								</Stack>
								<Flex justify='space-between'>
									<Button
										variant='light'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										onClick={() => userTab.current.click()}>
										Prev
									</Button>
									<Button
										variant='darkBrand'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										ms='auto'
										onClick={() => profileTab.current.click()}>
										Next
									</Button>
								</Flex>
							</Flex>
						</Card>
					</TabPanel>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								Profile
							</Text>
							<Flex direction='column' w='100%'>
								<Stack direction='column' spacing='20px'>
									<InputField
										id='profile email'
										placeholder='Your primary email address'
										label='Profile Email'
										mb='0px'
									/>
									<TextField
										minH='150px'
										id='bio'
										placeholder='Enter a few words about you'
										label='Bio'
									/>
								</Stack>
								<Flex justify='space-between' mt='24px'>
									<Button
										variant='light'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										onClick={() => addressTab.current.click()}>
										Prev
									</Button>
									<Button
										variant='darkBrand'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'>
										Submit
									</Button>
								</Flex>
							</Flex>
						</Card>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
}
