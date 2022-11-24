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
import Card from 'renderer/components/card/Card';

import SearchTableUsers from 'renderer/views/admin/main/users/overview/components/SearchTableUsersOverivew';
import tableDataUsersOverview from 'renderer/views/admin/main/users/overview/variables/tableDataUsersOverview';

export default function UsersOverview() {
	return (
		<Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
			<Card px='0px'>
				<SearchTableUsers tableData={tableDataUsersOverview}  />
			</Card>
		</Flex>
	);
}
