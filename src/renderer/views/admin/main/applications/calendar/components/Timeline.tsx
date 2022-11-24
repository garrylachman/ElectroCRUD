// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import TimelineItem from 'renderer/components/dataDisplay/TimelineItem';

export default function Default(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card {...rest}>
			<Text fontSize='2xl' fontWeight='700' color={textColor}>
				Timeline
			</Text>
			<Text fontSize='md' fontWeight='500' color='secondaryGray.600' mb='30px'>
				See your products in our timelines:
			</Text>
			<TimelineItem
				mb='16px'
				title='Meeting with a client'
				day='03'
				weekday='Wed'
				hours='08:00 - 10:00'
				current
			/>
			<TimelineItem
				mb='16px'
				title='Webinar - Marketing for Developers'
				day='12'
				weekday='Fri'
				hours='10:30 - 12:00'
			/>
			<TimelineItem
				mb='16px'
				title='Design UI and check sales on PayPal'
				day='16'
				weekday='Tue'
				hours='09:00 - 14:00'
			/>
			<TimelineItem
				title='Configure table for Daily tasks on Notion'
				day='27'
				weekday='Sat'
				hours='20:00 - 22:30'
			/>
		</Card>
	);
}
