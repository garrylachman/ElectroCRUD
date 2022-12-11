import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';
import TagsField from 'renderer/components/fields/tags-field';
import TextField from 'renderer/components/fields/TextField';
import Dropzone, 
from 'renderer/views/admin/main/ecommerce/newProduct/components/Dropzone';

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
// Custom components
// Assets
export default function NewProduct() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const [ activeBullets, setActiveBullets ] = useState({
		product: true,
		media: false,
		pricing: false
	});

	const productTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const mediaTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const pricingTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const brand = useColorModeValue('brand.500', 'brand.400');

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
				mt={{ base: '60px', md: '165px' }}
				zIndex='0'
				display='flex'
				flexDirection='column'>
				<TabList display='flex' alignItems='center' alignSelf='center' justifySelf='center'>
					<Tab
						ref={productTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								product: true,
								media: false,
								pricing: false
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
								bg: activeBullets.media ? 'white' : '#8476FF',
								left: { sm: '12px', md: '40px' },
								top: {
									sm: activeBullets.product ? '6px' : '4px',
									md: null
								},
								position: 'absolute',
								bottom: activeBullets.product ? '40px' : '38px',

								transition: 'all .3s ease'
							}}>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.product ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.product ? 'white' : 'gray.300'}
								fontWeight={activeBullets.product ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								Product Info
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={mediaTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								product: true,
								media: true,
								pricing: false
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
								bg: activeBullets.pricing ? 'white' : '#8476FF',
								left: { sm: '12px', md: '28px' },
								top: '6px',
								position: 'absolute',
								bottom: activeBullets.media ? '40px' : '38px',

								transition: 'all .3s ease'
							}}>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.media ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.media ? 'white' : 'gray.300'}
								fontWeight={activeBullets.media ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								Media
							</Text>
						</Flex>
					</Tab>
					<Tab
						ref={pricingTab}
						w={{ sm: '120px', md: '250px', lg: '300px' }}
						onClick={() =>
							setActiveBullets({
								product: true,
								media: true,
								pricing: true
							})}>
						<Flex direction='column' justify='center' align='center' position='relative'>
							<Box
								zIndex='1'
								border='2px solid'
								borderColor={activeBullets.pricing ? 'white' : '#8476FF'}
								bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
								w='16px'
								h='16px'
								mb='8px'
								borderRadius='50%'
							/>
							<Text
								color={activeBullets.pricing ? 'white' : 'gray.300'}
								fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
								display={{ sm: 'none', md: 'block' }}>
								Pricing
							</Text>
						</Flex>
					</Tab>
				</TabList>
				<TabPanels mt='24px' maxW={{ md: '90%', lg: '100%' }} mx='auto'>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								Product Info
							</Text>
							<Flex direction='column' w='100%'>
								<SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
									<Stack direction='column' gap='20px'>
										<InputField
											mb='0px'
											id='name'
											placeholder='eg. Elegant Chair'
											label='Product Name'
										/>
										<InputField mb='0px' id='weight' placeholder='eg. 20kg' label='Weight' />
										<InputField mb='0px' id='Color' placeholder='eg. Purple' label='Color' />
									</Stack>
									<Stack direction='column' gap='20px'>
										<InputField
											mb='0px'
											id='Collection'
											placeholder='eg. Classics'
											label='Collection'
										/>
										<TextField
											h='146px'
											mb='0px'
											id='Description'
											placeholder='Short description about the product'
											label='Description'
										/>
									</Stack>
								</SimpleGrid>
								<Flex justify='space-between' mt='24px'>
									<Button
										variant='darkBrand'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										ms='auto'
										onClick={() => mediaTab.current.click()}>
										Next
									</Button>
								</Flex>
							</Flex>
						</Card>
					</TabPanel>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								Media
							</Text>
							<Dropzone
								content={
									<Box>
										<Icon as={MdOutlineCloudUpload} w='80px' h='80px' color={textColor} />
										<Text
											mx='auto'
											mb='12px'
											fontSize='lg'
											fontWeight='700'
											whiteSpace='pre-wrap'
											color={textColor}>
											Drop your files here, or{' '}
											<Text as='span' fontSize='lg' fontWeight='700' color={brand}>
												browse
											</Text>
										</Text>
										<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
											PNG, JPG and GIF files are allowed
										</Text>
									</Box>
								}
							/>
							<Flex justify='space-between' mt='24px'>
								<Button
									variant='light'
									fontSize='sm'
									borderRadius='16px'
									w={{ base: '128px', md: '148px' }}
									h='46px'
									onClick={() => productTab.current.click()}>
									Prev
								</Button>
								<Button
									variant='darkBrand'
									fontSize='sm'
									borderRadius='16px'
									w={{ base: '128px', md: '148px' }}
									h='46px'
									onClick={() => pricingTab.current.click()}>
									Next
								</Button>
							</Flex>
						</Card>
					</TabPanel>
					<TabPanel w={{ sm: '330px', md: '700px', lg: '850px' }} p='0px' mx='auto'>
						<Card p='30px'>
							<Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
								Pricing
							</Text>
							<Flex direction='column' w='100%'>
								<Stack direction='column' spacing='20px'>
									<SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '0px', md: '20px' }}>
										<InputField id='price' placeholder='eg. $99' label='Price' />
										<InputField id='code' placeholder='eg. 4030120241' label='Unique Code' />
										<Flex direction='column' mb='34px'>
											<FormLabel
												ms='10px'
												htmlFor='currency'
												fontSize='sm'
												color={textColor}
												fontWeight='bold'
												_hover={{ cursor: 'pointer' }}>
												Currency
											</FormLabel>
											<Select
												fontSize='sm'
												id='currency'
												variant='main'
												h='44px'
												maxH='44px'
												defaultValue='usd'>
												<option value='usd'>USD</option>
												<option value='eur'>EUR</option>
												<option value='gbp'>GBP</option>
											</Select>
										</Flex>
									</SimpleGrid>
									<TagsField />
								</Stack>
								<Flex justify='space-between' mt='24px'>
									<Button
										variant='light'
										fontSize='sm'
										borderRadius='16px'
										w={{ base: '128px', md: '148px' }}
										h='46px'
										onClick={() => mediaTab.current.click()}>
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
