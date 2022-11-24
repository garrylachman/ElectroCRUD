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
import { Box, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import ChairDef from 'renderer/assets/img/ecommerce/ChairDef.png';
// Custom components
import Card from 'renderer/components/card/Card';

import Delete from 'renderer/views/admin/main/ecommerce/settingsProduct/components/Delete';
import Details from 'renderer/views/admin/main/ecommerce/settingsProduct/components/Details';
import Dropzone from 'renderer/views/admin/main/ecommerce/settingsProduct/components/DropzoneCard';
import Info from 'renderer/views/admin/main/ecommerce/settingsProduct/components/Info';
import Socials from 'renderer/views/admin/main/ecommerce/settingsProduct/components/Socials';

export default function Settings() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid columns={{ sm: 1, xl: 2 }} spacing={{ base: '20px', xl: '20px' }}>
				{/* Column Left */}
				<Flex direction='column'>
					<Card mb='20px'>
						<Image borderRadius='20px' h={{ base: 'auto', xl: '396px', '2xl': 'auto' }} src={ChairDef} />
					</Card>
					<Info />
				</Flex>
				{/* Column Right */}
				<Flex direction='column'>
					<Dropzone mb='20px' />
					<Socials mt='20px' />
				</Flex>
			</SimpleGrid>
			<Details />
			<Delete />
		</Box>
	);
}
