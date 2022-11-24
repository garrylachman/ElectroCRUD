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
import Connected from 'renderer/views/admin/main/account/settings/components/Connected';
import Delete from 'renderer/views/admin/main/account/settings/components/Delete';
import Information from 'renderer/views/admin/main/account/settings/components/Information';
import Newsletter from 'renderer/views/admin/main/account/settings/components/Newsletter';
import Password from 'renderer/views/admin/main/account/settings/components/Password';
import Profile from 'renderer/views/admin/main/account/settings/components/Profile';
import Sessions from 'renderer/views/admin/main/account/settings/components/Sessions';
import Socials from 'renderer/views/admin/main/account/settings/components/Socials';
import TwoFactor from 'renderer/views/admin/main/account/settings/components/TwoFactor';

export default function Settings() {
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			{/* Main Fields */}
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 1, lg: 2 }} spacing={{ base: '20px', xl: '20px' }}>
				{/* Column Left */}
				<Flex direction='column'>
					<Profile />
					<Information />
					<Socials />
					<Password />
				</Flex>
				{/* Column Right */}
				<Flex direction='column'>
					<TwoFactor mb='20px' />
					<Newsletter mb='20px' />
					<Sessions mb='20px' />
					<Connected mb='20px' />
					<Delete />
				</Flex>
			</SimpleGrid>
		</Box>
	);
}
