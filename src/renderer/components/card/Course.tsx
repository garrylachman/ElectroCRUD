// Chakra imports
import { Box, Flex, Text, useColorModeValue, Badge, Icon } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import IconBox from 'renderer/components/icons/IconBox';
// Assets
import { MdOutlineTimer } from 'react-icons/md';

export default function Course(props: {
	icon: JSX.Element;
	title: string;
	desc: string;
	date: string;
	day: string;
	time: string;
	topics: string[];
	bgBox: string;
}) {
	const { icon, title, desc, date, day, time, topics, bgBox } = props;
	const textColor = useColorModeValue('navy.700', 'white');
	const textBrand = useColorModeValue('brand.500', 'white');
	const bgBadge = useColorModeValue('secondaryGray.300', 'whiteAlpha.50');
	return (
		<Card p='20px' h='max-content' minH={{ md: '450px', xl: 'auto' }}>
			<Flex direction={{ base: 'column', md: 'column', xl: 'row' }}>
				<IconBox
					bg={bgBox}
					icon={icon}
					minW={{ base: '100%', xl: '270px' }}
					minH={{ base: '200px', xl: '270px' }}
					borderRadius='20px'
					me='34px'
				/>
				<Flex
					justify='space-between'
					flexDirection='column'
					mb='auto'
					py='30px'
					pb={{ base: '0px', md: '0px' }}>
					<Flex display={{ base: 'block', xl: 'flex' }}>
						<Box flexDirection='column' w={{ xl: '68%' }} mb='25px'>
							<Text
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'xl',
									xl: 'xl',
									'2xl': '28px'
								}}
								mb='10px'
								fontWeight='700'>
								{title}
							</Text>
							<Text
								color='secondaryGray.600'
								fontSize={{
									base: 'md'
								}}
								fontWeight='400'
								me='14px'>
								{desc}
							</Text>
						</Box>
						<Text
							ms='auto'
							mt='10px'
							color='secondaryGray.600'
							fontSize={{
								base: 'md'
							}}
							fontWeight='500'>
							{day} •{' '}
							<Text
								as='span'
								color={textColor}
								fontSize={{
									base: 'md'
								}}
								fontWeight='500'
								ms='4px'>
								{date}
							</Text>
						</Text>
					</Flex>
					<Flex w='100%' flexWrap='wrap'>
						{topics.map((topic, key) => (
							<Badge
								key={key}
								bg={bgBadge}
								textAlign='center'
								mb={{ base: '20px', md: '0px' }}
								color={textBrand}
								me='10px'
								h='max-content'>
								{topic}
							</Badge>
						))}
						<Flex align='center' ms={{ base: '0px', xl: 'auto' }} pe={{ base: '10px', md: '0px' }}>
							<Icon as={MdOutlineTimer} color={textColor} me='6px' />
							<Text
								color={textColor}
								fontSize={{
									base: 'sm'
								}}
								fontWeight='500'
								me='14px'>
								{time}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
