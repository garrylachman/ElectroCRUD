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
import { Flex } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Banner from 'renderer/views/admin/main/account/invoice/components/Banner';
import Content from 'renderer/views/admin/main/account/invoice/components/Content';

export default function Invoice() {
	// Chakra Color Mode
	return (
		<Card mt={{ base: '130px', md: '80px', xl: '80px' }} maxW='920px' mx='auto'>
			<Flex direction='column' width='stretch'>
				<Banner />
				<Content />
			</Flex>
		</Card>
	);
}
