import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import React, { useState } from 'react';
import CircularSlider from 'react-circular-slider-svg';

export default function CircularProgress() {
	const [ temperature, setTemperature ] = useState(21);
	const arcColor = useColorModeValue('#7551FF', '#4318FF');
	const arcBackgroundColor = useColorModeValue('#F4F7FE', 'rgba(255,255,255,0.1)');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardBg = useColorModeValue('white', 'navy.700');
	// Chakra Color Mode
	return (
		<Card>
			<Text fontSize='lg' color={textColor} fontWeight='bold'>
				Device Limit
			</Text>
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
					fontSize='32px'
					fontWeight='bold'
					position='absolute'
					top='28%'>{`${temperature} °C`}</Text>
				<Card bg={cardBg} mt='-50px'>
					<Text fontSize='xs' color='gray.400' fontWeight='bold'>
						16°C
					</Text>
					<Text fontSize='xs' color='gray.400' fontWeight='bold'>
						32°C
					</Text>
				</Card>
			</Flex>
		</Card>
	);
}
