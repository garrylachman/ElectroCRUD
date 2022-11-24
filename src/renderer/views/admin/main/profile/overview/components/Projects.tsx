// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import Project1 from 'renderer/assets/img/users/Project1.png';
import Project2 from 'renderer/assets/img/users/Project2.png';
import Project3 from 'renderer/assets/img/users/Project3.png';
// Custom components
import Card from 'renderer/components/card/Card';

import Project from 'renderer/views/admin/main/profile/overview/components/Project';

export default function Projects() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	return (
		<Card mb={{ base: '0px', '2xl': '20px' }}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>
				All projects
			</Text>
			<Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
				Here you can find more details about your projects. Keep you user engaged by providing meaningful
				information.
			</Text>
			<Project mb='20px' image={Project1} ranking='1' link='#' title='Technology behind the Blockchain' />
			<Project mb='20px' image={Project2} ranking='2' link='#' title='Greatest way to a good Economy' />
			<Project image={Project3} ranking='3' link='#' title='Most essential tips for Burnout' />
		</Card>
	);
}
