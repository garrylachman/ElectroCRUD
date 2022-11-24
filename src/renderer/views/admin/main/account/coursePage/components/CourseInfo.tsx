// Chakra imports
import {
	Box,
	Button,
	Flex,
	Icon,
	Text,
	useColorModeValue,
	SimpleGrid,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel
} from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import Rating from 'renderer/views/admin/main/account/coursePage/components/Rating';
import Instructor from 'renderer/views/admin/main/account/coursePage/components/Instructor';
import { useState } from 'react';

// Assets
import { IoMdStar, IoMdStarHalf } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function CourseInfo(props: { [x: string]: any }) {
	let [ tabState, setTabState ] = useState('notes');

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'white');
	const textColorTertiary = useColorModeValue('secondaryGray.600', 'secondaryGray.500');
	const borderColor = useColorModeValue('secondaryGray.500', 'white');
	const hover = useColorModeValue({ bg: 'secondaryGray.100' }, { bg: 'whiteAlpha.100' });
	const { ...rest } = props;
	const panelExample = () => (
		<SimpleGrid columns={1} gap='40px' {...rest} maxW='100%' w={{ base: '100%', md: 'unset' }}>
			<Text fontSize='lg' color={textColorSecondary} fontWeight='400'>
				Once you spend just a few hours learning the powerful proven Instagram marketing techniques, you will
				see why we are the recommend course. We have easy to follow step by step techniques to grow your
				followers and market your business.
			</Text>
			<Text fontSize='lg' color={textColorSecondary} fontWeight='400'>
				Your time will pay off by reaching thousands of new customers, and building a strong, trustworthy
				relationship through Instagram will skyrocket your brand awareness to a level beyond your expectations.
				You will have the tools to create quality content, grow your Instagram followers and market your
				business to these hyper-targeted customers.
			</Text>
			<Text fontSize='lg' color={textColorSecondary} fontWeight='400'>
				When making a purchasing decision, people online use your social media presence as a measure of the
				quality, and trustworthiness of your business. Nothing speaks trust and quality louder than having a
				thousands of targeted, real, and loving Instagram followers on your profile (of which you can contact at
				any time!) Your profile will be professional and compelling and you will be using stories, live
				streaming and all the other new features Instagram releases.
			</Text>
		</SimpleGrid>
	);
	return (
		<Card mt='20px' p={{ base: '20px', md: '20px 40px' }}>
			<Flex align='center' w='100%'>
				<Text fontSize='lg' color={textColorSecondary} fontWeight='500' mb='12px'>
					Student feedback
				</Text>
				<Text ms='auto' color={textColorTertiary} me='20px' fontSize='lg' fontWeight='500'>
					CHAPTER 3/5
				</Text>
				<Button
					border='1px solid'
					borderColor={borderColor}
					bg='transparent'
					_hover={hover}
					me='10px'
					borderRadius='50%'
					h='38px'
					w='38px'>
					<Icon as={MdChevronLeft} color={borderColor} h='24px' w='24px' />
				</Button>
				<Button variant='brand' borderRadius='50%' h='38px' w='38px'>
					<Icon as={MdChevronRight} color={'white'} h='24px' w='24px' />
				</Button>
			</Flex>
			<Box w='100%' mb='40px'>
				<Flex direction={{ base: 'column', '3xl': 'row' }}>
					<Box me={{ md: '40px', '3xl': '40px' }}>
						<Tabs variant='soft-rounded' colorScheme='brandTabs' mb='60px'>
							<TabList overflowX={{ sm: 'scroll', lg: 'unset' }}>
								<Flex>
									<Tab
										pb='0px'
										flexDirection='column'
										onClick={function() {
											setTabState('notes');
										}}
										me='10px'
										bg='unset'
										_selected={{
											bg: 'none'
										}}
										_focus={{ border: 'none' }}
										minW='max-content'>
										<Flex align='center'>
											<Text
												color={tabState === 'notes' ? textColor : textColorTertiary}
												fontSize='lg'
												fontWeight='500'>
												Notes
											</Text>
										</Flex>
										<Box
											height='4px'
											w='100%'
											transition='0.1s linear'
											bg={tabState === 'notes' ? 'brand.500' : 'transparent'}
											mt='15px'
											borderRadius='30px'
										/>
									</Tab>
									<Tab
										onClick={function() {
											setTabState('resources');
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
											<Text
												color={tabState === 'resources' ? textColor : textColorTertiary}
												fontSize='lg'
												fontWeight='500'>
												Resources
											</Text>
										</Flex>
										<Box
											height='4px'
											w='100%'
											transition='0.1s linear'
											bg={tabState === 'resources' ? 'brand.500' : 'transparent'}
											mt='15px'
											borderRadius='30px'
										/>
									</Tab>
									<Tab
										pb='0px'
										flexDirection='column'
										onClick={function() {
											setTabState('quiz');
										}}
										bg='unset'
										_selected={{
											bg: 'none'
										}}
										_focus={{ border: 'none' }}
										minW='max-content'>
										<Flex align='center'>
											<Text
												color={tabState === 'quiz' ? textColor : textColorTertiary}
												fontSize='lg'
												fontWeight='500'>
												Quiz (3)
											</Text>
										</Flex>
										<Box
											height='4px'
											w='100%'
											transition='0.1s linear'
											bg={tabState === 'quiz' ? 'brand.500' : 'transparent'}
											mt='15px'
											borderRadius='30px'
										/>
									</Tab>
								</Flex>
							</TabList>
							<TabPanels pt='30px'>
								<TabPanel px='0px'>{panelExample()}</TabPanel>
								<TabPanel px='0px'>{panelExample()}</TabPanel>
								<TabPanel px='0px'>{panelExample()}</TabPanel>
							</TabPanels>
						</Tabs>
						<Flex direction={{ base: 'column', md: 'row' }} align='center'>
							<Box
								w={{ base: 'unset', md: '30%', '3xl': '50%' }}
								ms={{ base: 'auto', md: 'unset' }}
								me={{ base: 'auto', '3xl': '50px' }}>
								<Text
									fontSize={{ base: '70px', '3xl': '80px' }}
									color='orange.500'
									fontWeight='700'
									lineHeight='105%'
									maxW='max-content'>
									4.8
								</Text>
								<Flex mb='8px' maxW='max-content'>
									<Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
									<Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
									<Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
									<Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
									<Icon color='orange.500' h='24px' w='24px' as={IoMdStarHalf} />
								</Flex>
								<Text
									fontSize='lg'
									color={textColorTertiary}
									fontWeight='500'
									maxW='max-content'
									mb={{ base: '20px', md: '0px' }}>
									Course Rating
								</Text>
							</Box>
							<Box>
								<Rating value='78' mb='5px' stars={5} />
								<Rating value='24' mb='5px' stars={4} />
								<Rating value='12' mb='5px' stars={3} />
								<Rating value='8' mb='5px' stars={2} />
								<Rating value='4' stars={1} />
							</Box>
						</Flex>
					</Box>

					<Box
						mx={{ base: 'auto', xl: 'unset' }}
						maxW={{
							sm: '100%',
							md: '550px',
							lg: '500px',
							'2xl': '800px',
							'3xl': '300px'
						}}>
						<Instructor />
					</Box>
				</Flex>
			</Box>
		</Card>
	);
}
