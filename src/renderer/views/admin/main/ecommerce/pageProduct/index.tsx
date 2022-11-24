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
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Button,
	Flex,
	FormLabel,
	Icon,
	Image,
	Select,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import React, { useState } from 'react';
import { MdStar, MdStarHalf } from 'react-icons/md';

export default function ProductPage() {
	const [ currentImage, setCurrentImage ] = useState('https://i.ibb.co/Y8V1gLW/2212121212-1.jpg');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
	const Chair1 =
		'https://images.unsplash.com/photo-1527005980469-e172416c200b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80';
	const Chair2 =
		'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80';
	const Chair3 =
		'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80';
	const Chair4 =
		'https://images.unsplash.com/photo-1554104707-a76b270e4bbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';
	const Chair5 =
		'https://images.unsplash.com/photo-1489269637500-aa0e75768394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2641&q=80';

	return (
		<Card mt={{ sm: '125px', md: '75px' }} me={{ lg: '60px' }}>
			<Flex direction='column' w='100%'>
				<Flex direction={{ sm: 'column', lg: 'column', xl: 'row' }}>
					<Flex direction='column' me={{ lg: '40px', xl: '60px' }} mb={{ sm: '24px', lg: '0px' }}>
						<Box
							w={{
								sm: 'fit',
								md: 'fit',
								lg: '800px',
								xl: '555px',
								'2xl': '745px'
							}}
							h={{
								sm: '100%',
								md: '670px',
								lg: '600px',
								xl: '555px',
								'2xl': '745px'
							}}
							mb='26px'
							mx={{ sm: 'auto', lg: 'auto', xl: '0px' }}>
							<Image src={currentImage} w='100%' h='100%' borderRadius='15px' />
						</Box>
						<Stack direction='row' spacing={{ sm: '20px', md: '35px', lg: '20px' }} mx='auto'>
							<Box
								w={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}
								h={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}>
								<Image
									src={Chair1}
									w='100%'
									h='100%'
									borderRadius='15px'
									cursor='pointer'
									onClick={(e: any) => setCurrentImage(e.target.src)}
								/>
							</Box>
							<Box
								w={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}
								h={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}>
								<Image
									src={Chair2}
									w='100%'
									h='100%'
									borderRadius='15px'
									cursor='pointer'
									onClick={(e: any) => setCurrentImage(e.target.src)}
								/>
							</Box>
							<Box
								w={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}
								h={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}>
								<Image
									src={Chair3}
									w='100%'
									h='100%'
									borderRadius='15px'
									cursor='pointer'
									onClick={(e: any) => setCurrentImage(e.target.src)}
								/>
							</Box>
							<Box
								w={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}
								h={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}>
								<Image
									src={Chair4}
									w='100%'
									h='100%'
									borderRadius='15px'
									cursor='pointer'
									onClick={(e: any) => setCurrentImage(e.target.src)}
								/>
							</Box>
							<Box
								w={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}
								h={{
									sm: '42px',
									md: '104px',
									lg: '70px',
									xl: '90px',
									'2xl': '130px'
								}}>
								<Image
									src={Chair5}
									w='100%'
									h='100%'
									borderRadius='15px'
									cursor='pointer'
									onClick={(e: any) => setCurrentImage(e.target.src)}
								/>
							</Box>
						</Stack>
					</Flex>
					<Flex direction='column'>
						<Text
							color={textColor}
							fontSize='3xl'
							fontWeight='bold'
							mb='12px'
							mt={{ sm: '20px', md: '50px', '2xl': '20px', '3xl': '50px' }}>
							ZOE™️ Elegant Chair
						</Text>
						<Flex w='min-content'>
							<Stack direction='row' spacing='4px' me='6px' color='orange.300' mb='30px'>
								<Icon as={MdStar} w='23px' h='23px' />
								<Icon as={MdStar} w='23px' h='23px' />
								<Icon as={MdStar} w='23px' h='23px' />
								<Icon as={MdStar} w='23px' h='23px' />
								<Icon as={MdStarHalf} w='23px' h='23px' />
							</Stack>
							<Text fontWeight='500' color={textColor}>
								28
							</Text>
						</Flex>
						<Text color='secondaryGray.600' pe={{ base: '0px', '3xl': '200px' }} mb='40px'>
							Just consists of a shell made of molded ash or oak veneer and a steel or chrome frame. The
							frame is mounted to the seat by slotting seamlessly into the millings underneath the shell.
							The chairs are stackable, up to 6 pcs. The chair is delivered assembled.
						</Text>
						<Text
							textDecoration='line-through'
							color='secondaryGray.600'
							fontWeight='500'
							fontSize='md'
							lineHeight='100%'>
							$590.00
						</Text>
						<Flex mb='40px' alignItems='center'>
							<Text color={textColor} fontWeight='bold' fontSize='38px' me='10px'>
								$2,599.00
							</Text>
							<Badge
								colorScheme='green'
								color='green.500'
								w='95px'
								h='28px'
								borderRadius='8px'
								display='flex'
								alignItems='center'
								justifyContent='center'>
								IN STOCK
							</Badge>
						</Flex>
						<Flex mb='50px' direction='column' w={{ base: 'fit', '2xl': '400px' }}>
							<SimpleGrid
								columns={{ md: 1, lg: 2 }}
								spacing='20px'
								w={{ base: 'fit', '2xl': '400px' }}
								mb='20px'>
								<Flex direction='column' mb='14px'>
									<FormLabel
										ms='10px'
										htmlFor='color'
										fontSize='sm'
										color={textColor}
										fontWeight='bold'
										_hover={{ cursor: 'pointer' }}>
										Color
									</FormLabel>
									<Select
										fontSize='sm'
										id='color'
										variant='main'
										h='44px'
										maxH='44px'
										fontWeight='400'
										me='20px'
										defaultValue='dark_grey'>
										<option value='dark_grey'>Dark Grey</option>
										<option value='black'>Black</option>
										<option value='white'>White</option>
									</Select>
								</Flex>
								<Flex direction='column'>
									<FormLabel
										ms='10px'
										htmlFor='quantity'
										fontSize='sm'
										color={textColor}
										fontWeight='bold'
										_hover={{ cursor: 'pointer' }}>
										Quantity
									</FormLabel>
									<Select
										fontSize='sm'
										id='quantity'
										variant='main'
										h='44px'
										maxH='44px'
										fontWeight='400'
										me='20px'
										mb='14px'
										defaultValue='2'>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
										<option value='6'>6</option>
									</Select>
								</Flex>
							</SimpleGrid>
							<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500'>
								Add to cart
							</Button>
						</Flex>
						<Accordion defaultIndex={[ 0 ]} allowToggle w={{ sm: '100%', md: '100%', xl: '94%' }} mb='16px'>
							<AccordionItem border='none'>
								<AccordionButton
									p='20px 0px 20px 0px'
									borderBottom='1px solid'
									borderColor={borderColor}>
									<Box flex='1' textAlign='left'>
										<Text color={textColor} fontWeight='700' fontSize={{ sm: 'md', lg: 'md' }}>
											Description
										</Text>
									</Box>
									<AccordionIcon color='gray.500' />
								</AccordionButton>
								<AccordionPanel p='18px 0px 10px 0px'>
									<Text
										color='secondaryGray.600'
										fontWeight='500'
										fontSize='md'
										textAlign='left'
										alignSelf='flex-start'
										justifySelf='flex-start'>
										ZOE™ is a simple and understated stackable shell chair with lots of personality
										and character that is as beautiful when seen from below as from above. The frame
										is discretely tucked into the chair's molded shell, and the shell's tapering
										thickness gives it a friendly expression.
									</Text>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem border='none'>
								<AccordionButton
									p='20px 0px 20px 0px'
									borderBottom='1px solid'
									borderColor={borderColor}>
									<Box flex='1' textAlign='left'>
										<Text color={textColor} fontWeight='700' fontSize={{ sm: 'md', lg: 'md' }}>
											Characteristics
										</Text>
									</Box>
									<AccordionIcon color='gray.500' />
								</AccordionButton>
								<AccordionPanel p='18px 0px 10px 0px'>
									<Text
										color='secondaryGray.600'
										fontWeight='500'
										fontSize='md'
										textAlign='left'
										alignSelf='flex-start'
										justifySelf='flex-start'>
										ZOE™ is a simple and understated stackable shell chair with lots of personality
										and character that is as beautiful when seen from below as from above. The frame
										is discretely tucked into the chair's molded shell, and the shell's tapering
										thickness gives it a friendly expression.
									</Text>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem border='none'>
								<AccordionButton
									p='20px 0px 20px 0px'
									borderBottom='1px solid'
									borderColor={borderColor}>
									<Box flex='1' textAlign='left'>
										<Text color={textColor} fontWeight='700' fontSize={{ sm: 'md', lg: 'md' }}>
											Reviews
										</Text>
									</Box>
									<AccordionIcon color='gray.500' />
								</AccordionButton>
								<AccordionPanel p='18px 0px 10px 0px'>
									<Text
										color='secondaryGray.600'
										fontWeight='500'
										fontSize='md'
										textAlign='left'
										alignSelf='flex-start'
										justifySelf='flex-start'>
										ZOE™ is a simple and understated stackable shell chair with lots of personality
										and character that is as beautiful when seen from below as from above. The frame
										is discretely tucked into the chair's molded shell, and the shell's tapering
										thickness gives it a friendly expression.
									</Text>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
