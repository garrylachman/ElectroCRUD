// Chakra imports
import { Avatar, Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
// Custom components
import Card from 'renderer/components/card/Card';

export default function CourseInfo(props: { [x: string]: any }) {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const bg = useColorModeValue('secondaryGray.300', 'navy.700');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'secondaryGray.600');
	const { ...rest } = props;
	return (
		<Card h='maxContent' {...rest} mt='50px' bg={bg}>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
				About Instructor
			</Text>
			<Flex alignItems='center' mb='20px'>
				<Avatar
					h='48px'
					w='48px'
					src='https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
					me='20px'
				/>
				<Box>
					<Text color={textColor} fontSize='md' fontWeight='700'>
						Michael J. Storm
					</Text>
					<Text color='secondaryGray.600' fontSize='sm' fontWeight='400'>
						Marketing Department
					</Text>
				</Box>
			</Flex>
			<Text color={textColorSecondary} fontSize='md' mb='20px'>
				Michael is an entrepreneur at heart, he builds businesses. Currently, he helps Fortune 100 brands
				leverage consumer attention through his full service advertising agency, Kaizoo.
			</Text>
			<Button variant='brand'>See all courses</Button>
		</Card>
	);
}
