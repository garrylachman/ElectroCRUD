// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';

import Information from 'renderer/views/admin/main/profile/overview/components/Information';

// Assets
export default function GeneralInformation(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	return (
		<Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>
				General Information
			</Text>
			<Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
				As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted
				by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give
				others a hand. We get our heart broken by people we love, even that we give them all...
			</Text>
			<SimpleGrid columns={2} gap='20px'>
				<Information title='Education' value='Stanford University' />
				<Information title='Languages' value='English, Spanish, Italian' />
				<Information title='Department' value='Product Design' />
				<Information title='Work History' value='Google, Facebook' />
				<Information title='Organization' value='Simmmple Web LLC' />
				<Information title='Birthday' value='20 July 1986' />
			</SimpleGrid>
		</Card>
	);
}
