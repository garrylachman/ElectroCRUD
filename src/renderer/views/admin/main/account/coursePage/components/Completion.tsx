// Chakra imports
import { Box, Flex, Text, Icon, Link, Image, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import { CircProgressMini } from 'renderer/components/charts/CircularProgress';
// Assets
import diploma from 'renderer/assets/img/account/Diploma.png';
import { MdFlag, MdCheck, MdChevronRight, MdLock } from 'react-icons/md';

import { VSeparator } from 'renderer/components/separator/Separator';

export default function CourseInfo(props: { [x: string]: any }) {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const bgBar = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
	const bg = useColorModeValue('secondaryGray.300', 'navy.700');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'secondaryGray.500');
	const textColorTertiary = useColorModeValue('secondaryGray.600', 'white');
	const { ...rest } = props;
	return (
		<Card {...rest} maxH='max-content'>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
				Instagram Marketing: Complete Guide
			</Text>
			<Flex alignItems='center' mb='20px'>
				<Text color={textColorSecondary} fontSize='md' fontWeight='700'>
					3/5 COMPLETED
				</Text>
				<Icon ms='auto' as={MdFlag} color='green.500' h='18px' w='18px' />
			</Flex>
			<SimpleGrid columns={5} gap='5px' alignItems='center' mb='20px'>
				<Flex bg='green.500' h='8px' borderRadius='36px' />
				<Flex bg='green.500' h='8px' borderRadius='36px' />
				<Flex bg='green.500' h='8px' borderRadius='36px' />
				<Flex bg={bgBar} h='8px' borderRadius='36px' />
				<Flex bg={bgBar} h='8px' borderRadius='36px' />
			</SimpleGrid>
			<Flex mb='25px' align='center' cursor='pointer'>
				<Box w='30px' me='12px'>
					<CircProgressMini step='1' percentage={100} />
				</Box>
				<Text color={textColorTertiary} fontWeight='500' fontSize='md' me='5px'>
					Introduction to Marketing
				</Text>
				<Icon as={MdCheck} h='18px' w='18px' color={textColorTertiary} />
				<Icon as={MdChevronRight} ms='auto' h='22px' w='22px' color={textColorTertiary} />
			</Flex>
			<Flex mb='25px' align='center' cursor='pointer'>
				<Box w='30px' me='12px'>
					<CircProgressMini step='2' percentage={100} />
				</Box>
				<Text color={textColorTertiary} fontWeight='500' fontSize='md' me='5px'>
					Understanding the Instagram
				</Text>
				<Icon as={MdCheck} h='18px' w='18px' color={textColorTertiary} />
				<Icon as={MdChevronRight} ms='auto' h='22px' w='22px' color={textColorTertiary} />
			</Flex>
			<Flex mb='25px' align='center' cursor='pointer'>
				<Box w='30px' me='12px'>
					<CircProgressMini step='3' percentage={22} />
				</Box>
				<Text color={'green.500'} fontWeight='500' fontSize='md' me='5px'>
					Creating An Instagram Ad Account
				</Text>
				<Icon as={MdChevronRight} ms='auto' h='22px' w='22px' color={textColorTertiary} />
			</Flex>
			<Flex mb='25px' align='center' cursor='pointer'>
				<Box w='30px' me='12px'>
					<CircProgressMini step='4' percentage={0} />
				</Box>
				<Text color={textColor} fontWeight='500' fontSize='md' me='5px'>
					Instagram Ads for Creators
				</Text>
				<Icon as={MdLock} h='18px' w='18px' color={textColor} />
				<Icon as={MdChevronRight} ms='auto' h='22px' w='22px' color={textColorTertiary} />
			</Flex>
			<Flex mb='25px' align='center' cursor='pointer'>
				<Box w='30px' me='12px'>
					<CircProgressMini step='5' percentage={0} />
				</Box>
				<Text color={textColor} fontWeight='500' fontSize='md' me='5px'>
					Monetizing your Personal Account
				</Text>
				<Icon as={MdLock} h='18px' w='18px' color={textColor} />
				<Icon as={MdChevronRight} ms='auto' h='22px' w='22px' color={textColorTertiary} />
			</Flex>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
				What you’ll learn
			</Text>
			<Text color={textColor} fontSize='md' fontWeight='400' mb='50px'>
				You’ll learn to have a powerful Instagram account setup for your Business or personal that you can build
				your brand and convert your followers into paying customers, how to attract 20,000 real followers to
				your account and how to convert your new Instagram followers to long-term loyal paying customers who
				love your business!
			</Text>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
				By the numbers
			</Text>
			<Flex mb='50px'>
				<Box>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Skill level:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							All Levels
						</Text>
					</Flex>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Students:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							3468
						</Text>
					</Flex>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Languages:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							English
						</Text>
					</Flex>
				</Box>
				<Box ms='70px'>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Captions:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							Yes
						</Text>
					</Flex>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Lectures:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							277
						</Text>
					</Flex>
					<Flex mb='6px'>
						<Text fontSize='md' fontWeight='400' color='secondaryGray.600' me='4px'>
							Video:
						</Text>
						<Text fontSize='md' fontWeight='700' color={textColor}>
							38.5hrs
						</Text>
					</Flex>
				</Box>
			</Flex>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
				Horizon Academy Certificate
			</Text>
			<Card bg={bg} p='18px' maxW={{ base: '400px' }}>
				<Image src={diploma} borderRadius='14px' />
			</Card>
			<Flex
				mt='10px'
				mx={{ base: 'auto', md: 'unset', lg: 'auto' }}
				ms={{ base: 'auto', md: '80px', lg: 'auto' }}>
				<Link color={brandColor} fontSize='md' fontWeight='500' href='https://www.orimi.com/pdf-test.pdf'>
					Download PDF
				</Link>
				<VSeparator mx='10px' />
				<Link color={brandColor} fontSize='md' fontWeight='500' href='https://www.orimi.com/pdf-test.pdf'>
					Download JPG
				</Link>
			</Flex>
		</Card>
	);
}
