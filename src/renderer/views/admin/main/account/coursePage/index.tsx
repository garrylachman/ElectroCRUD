/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { AspectRatio, Box, Grid } from '@chakra-ui/react';

// Custom components
import CourseInfo from 'renderer/views/admin/main/account/coursePage/components/CourseInfo';
import Completion from 'renderer/views/admin/main/account/coursePage/components/Completion';
// Assets
export default function CoursePage() {
	// Chakra Color Mode
	return (
		<Box maxW='100%'>
			<Grid
				maxW='100%'
				display={{ base: 'block', lg: 'grid' }}
				pt={{ base: '130px', md: '80px', xl: '80px' }}
				gridTemplateColumns='2.95fr 1fr'>
				<Box gridArea='1 / 1 / 2 / 2' me={{ lg: '20px' }} mb={{ base: '20px', lg: '0px' }}>
					<AspectRatio w='100%' maxW='100%' ratio={1130 / 636}>
						<iframe
							style={{ borderRadius: '30px' }}
							src='https://www.youtube.com/embed/geyVktOxBJk'
							title='YouTube video player'
							frame-border='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allow-full-screen
						/>
					</AspectRatio>
					<CourseInfo />
				</Box>
				<Box gridArea='1 / 2 / 2 / 3'>
					<Completion />
				</Box>
			</Grid>
		</Box>
	);
}
