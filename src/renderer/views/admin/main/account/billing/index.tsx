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
import { Flex, SimpleGrid } from '@chakra-ui/react';
// Custom components
import YourCard from 'renderer/views/admin/main/account/billing/components/YourCard';
import YourTransactions from 'renderer/views/admin/main/account/billing/components/YourTransactions';
import YourTransfers from 'renderer/views/admin/main/account/billing/components/YourTransfers';
import Invoices from 'renderer/views/admin/main/account/billing/components/Invoices';
import Balance from 'renderer/views/admin/main/account/billing/components/Balance';
import Market from 'renderer/views/admin/main/account/billing/components/Market';
import PaymentMethod from 'renderer/views/admin/main/account/billing/components/PaymentMethod';
export default function Billing() {
	// Chakra Color Mode
	return (
		<Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Flex direction='column' width='stretch'>
				<SimpleGrid columns={{ sm: 1, md: 1, lg: 1, xl: 3 }} gap='20px' mb='20px'>
					<Flex>
						<YourCard />
					</Flex>
					<Flex direction='column'>
						<Balance mb='20px' />
						<PaymentMethod />
					</Flex>
					<Flex>
						<Invoices />
					</Flex>
				</SimpleGrid>
				<SimpleGrid columns={{ sm: 1, md: 1, lg: 1, xl: 3 }} gap='20px' mb='20px'>
					<Flex>
						<YourTransactions />
					</Flex>
					<Flex>
						<Market />
					</Flex>
					<Flex>
						<YourTransfers />
					</Flex>
				</SimpleGrid>
			</Flex>
		</Flex>
	);
}
