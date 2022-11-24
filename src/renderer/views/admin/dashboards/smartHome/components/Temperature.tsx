// Chakra imports
import { Flex, Text, Icon, useColorModeValue, Select } from '@chakra-ui/react';
import { useState } from 'react';
// Assets
import { MdOutlineLocationOn } from 'react-icons/md';
// Custom components
import Card from 'renderer/components/card/Card';
import CircularSlider from 'react-circular-slider-svg';

export default function CircularProgress() {
	const [ temperature, setTemperature ] = useState(21);
	// Chakra Color Mode
	const arcColor = useColorModeValue('#4318FF', '#7551FF');
	const arcBackgroundColor = useColorModeValue('#F4F7FE', 'rgba(255,255,255,0.1)');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardBg = useColorModeValue('white', 'navy.700');
	return (
		<Card p='30px'>
			<Text fontSize='lg' lineHeight='100%' color={textColor} fontWeight='bold'>
				Temperature Controller
			</Text>
			<Flex align='center'>
				<Icon as={MdOutlineLocationOn} color='secondaryGray.600' h='16px' w='16px' />
				<Select fontSize='sm' variant='subtle' defaultValue='Dinner' width='unset' ms='-10px' fontWeight='700'>
					<option value='Dinner'>Dinner Room</option>
					<option value='Living'>Living Room</option>
					<option value='Bedroom'>Bedroom</option>
				</Select>
			</Flex>
			<Flex direction='column' align='center' alignSelf='center' textAlign='center' position='relative'>
				<CircularSlider
					startAngle={45}
					endAngle={315}
					handleSize={6}
					minValue={18}
					maxValue={38}
					size={220}
					arcColor={arcColor}
					arcBackgroundColor={arcBackgroundColor}
					handle1={{
						value: temperature,
						onChange: (v) => setTemperature(Math.round(v))
					}}
				/>
				<Text
					color={textColor}
					fontSize='34px'
					fontWeight='bold'
					position='absolute'
					top='33%'>{`${temperature} °C`}</Text>
				<Card borderRadius='12px' p='20px 30px' flexDirection='row' bg={cardBg} mt='-50px'>
					<Text color={textColor} fontSize='lg' fontWeight='bold'>
						18°C
					</Text>
					<Text ms='auto' color={textColor} fontSize='lg' fontWeight='bold'>
						38°C
					</Text>
				</Card>
			</Flex>
		</Card>
	);
}
