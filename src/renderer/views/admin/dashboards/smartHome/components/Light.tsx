// Chakra imports
import {
	Box,
	Flex,
	Icon,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Select,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import IconBox from 'renderer/components/icons/IconBox';
// Assets
import { MdOutlineLightbulb, MdOutlineLocationOn } from 'react-icons/md';

export default function CircularProgress() {
	const brandBg = useColorModeValue('brand.500', 'white');
	const thumbColor = useColorModeValue('white', 'brand.400');
	const iconColor = useColorModeValue('brand.500', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardBg = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	// Chakra Color Mode
	return (
		<Card p='30px'>
			<Text fontSize='lg' lineHeight='100%' color={textColor} fontWeight='bold'>
				Light Controller
			</Text>
			<Flex align='center' mb='20px'>
				<Icon as={MdOutlineLocationOn} color='secondaryGray.600' h='16px' w='16px' />
				<Select fontSize='sm' variant='subtle' defaultValue='Dinner' width='unset' ms='-10px' fontWeight='700'>
					<option value='Dinner'>Dinner Room</option>
					<option value='Living'>Living Room</option>
					<option value='Bedroom'>Bedroom</option>
				</Select>
			</Flex>
			<IconBox
				mb='20px'
				mx='auto'
				h='90px'
				w='90px'
				boxShadow={cardShadow}
				bg={cardBg}
				icon={<Icon as={MdOutlineLightbulb} color={iconColor} h='56px' w='56px' />}
			/>
			<Box mb='36px'>
				<Text textAlign='center' mx='auto' color='secondaryGray.600' fontSize='md' fontWeight='bold'>
					Your program
				</Text>
				<Text textAlign='center' mx='auto' color={textColor} fontSize='lg' fontWeight='bold'>
					Between 12:00AM and 07:00AM
				</Text>
			</Box>
			<RangeSlider colorScheme='brandScheme' defaultValue={[ 10, 30 ]}>
				<RangeSliderTrack h='10px' borderRadius='78px'>
					<RangeSliderFilledTrack /*variant='main'*/ />
				</RangeSliderTrack>
				<RangeSliderThumb
					boxShadow='0px 3px 27px -20px rgba(112, 144, 176, 0.51)'
					w='18px'
					h='18px'
					border='4px solid'
					borderColor={thumbColor}
					bg={brandBg}
					index={0}
				/>
				<RangeSliderThumb
					boxShadow='0px 3px 27px -20px rgba(112, 144, 176, 0.51)'
					w='18px'
					h='18px'
					border='4px solid'
					borderColor={thumbColor}
					bg={brandBg}
					index={1}
				/>
			</RangeSlider>
		</Card>
	);
}
