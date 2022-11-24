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
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
// Assets
import banner from 'renderer/assets/img/auth/banner.png';
import profile from 'renderer/assets/img/crm/vbz.png';

// Custom components
import Info from 'renderer/views/admin/main/profile/settings/components/Info';
import Password from 'renderer/views/admin/main/profile/settings/components/Password';
import Profile from 'renderer/views/admin/main/profile/settings/components/Profile';
import Socials from 'renderer/views/admin/main/profile/settings/components/Socials';

export default function Settings() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 1, lg: 2 }} spacing={{ base: '20px', xl: '20px' }}>
				{/* Column Left */}
				<Flex direction='column'>
					<Profile name='Vlad Mihalache' avatar={profile} banner={banner} />
					<Info />
				</Flex>
				{/* Column Right */}
				<Flex direction='column'>
					<Socials />
					<Password />
				</Flex>
			</SimpleGrid>
		</Box>
	);
}
