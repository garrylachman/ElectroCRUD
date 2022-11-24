import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircProgress(props: { title: string; percentage: number }) {
	const { title, percentage } = props;
	let textColor = useColorModeValue('secondaryGray.900', 'white');
	let stylesColorMode = useColorModeValue(
		{
			rotation: 0.25,
			textSize: '0px',
			textColor: 'transparent',
			pathTransitionDuration: 0.5,
			pathColor: `#4318FF`,
			trailColor: '#E9EDF7',
			backgroundColor: '#3e98c7'
		},
		{
			rotation: 0.25,
			textSize: '0px',
			pathTransitionDuration: 0.5,
			pathColor: `#7551FF`,
			textColor: 'transparent',
			trailColor: '#1B254B'
		}
	);
	return (
		<CircularProgressbarWithChildren
			value={percentage}
			text={`${percentage}%`}
			styles={buildStyles(stylesColorMode)}>
			<Box>
				<Text fontSize='sm' color='secondaryGray.600' fontWeight='500'>
					{title}
				</Text>
				<Text fontSize='xl' color={textColor} fontWeight='700'>
					{percentage}%
				</Text>
			</Box>
		</CircularProgressbarWithChildren>
	);
}

export function CircProgressMini(props: { step: string; percentage: number }) {
	const { step, percentage } = props;
	let textColor = useColorModeValue('secondaryGray.900', 'white');
	let stylesColorMode = useColorModeValue(
		{
			rotation: 0.25,
			textSize: '0px',
			textColor: 'transparent',
			pathTransitionDuration: 0.5,
			pathColor: `#01B574`,
			trailColor: '#E9EDF7',
			backgroundColor: '#3e98c7'
		},
		{
			rotation: 0.25,
			textSize: '0px',
			pathTransitionDuration: 0.5,
			pathColor: `#01B574`,
			textColor: 'transparent',
			trailColor: '#1B254B'
		}
	);
	return (
		<CircularProgressbarWithChildren value={percentage} text={`${step}`} styles={buildStyles(stylesColorMode)}>
			<Box>
				<Text fontSize='sm' color={textColor} fontWeight='700'>
					{step}
				</Text>
			</Box>
		</CircularProgressbarWithChildren>
	);
}
