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
import { Flex, SimpleGrid, Text, Icon, Image, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Statistics from 'renderer/views/admin/main/account/application/components/MiniStatistics';
import IconBox from 'renderer/components/icons/IconBox';
import ManagementTable from 'renderer/views/admin/main/account/application/components/ManagementTable';
import tableDataManagement from 'renderer/views/admin/main/account/application/variables/tableDataManagement';

// Assets
import { MdOutlineBarChart, MdPerson, MdFileCopy } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import FakeBarChart from 'renderer/assets/img/account/FakeBarChart.png';

export default function Application() {
	// Chakra Color Mode
	const iconBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const iconColor = useColorModeValue('brand.500', 'white');
	return (
		<Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Flex direction='column' width='stretch'>
				<SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 2, '2xl': 4 }} gap='20px' mb='20px'>
					<Flex>
						<Statistics
							focused={true}
							bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
							title={'Total Income'}
							value='$4.347'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='white' />
									<Text color='white' fontSize='sm' mx='3px' fontWeight='500'>
										+20%
									</Text>
									<Text color='white' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg='linear-gradient(290.56deg, #868CFF -18.35%, #4318FF 60.45%)'
									icon={<Icon as={MdOutlineBarChart} w='38px' h='38px' color='white' />}
								/>
							}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Spendings'}
							value='$1.249'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowDownSFill} color='red.500' />
									<Text color='red.500' fontSize='sm' mx='4px' fontWeight='700'>
										-12%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={<Image src={FakeBarChart} />}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Activity'}
							value='1.920'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='green.500' />
									<Text color='green.500' fontSize='sm' mx='4px' fontWeight='700'>
										+16%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg={iconBg}
									icon={<Icon color={iconColor} as={MdPerson} w='38px' h='38px' />}
								/>
							}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Total Projects'}
							value='670'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='green.500' />
									<Text color='green.500' fontSize='sm' mx='4px' fontWeight='700'>
										+27%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg={iconBg}
									icon={<Icon color={iconColor} as={MdFileCopy} w='28px' h='28px' />}
								/>
							}
						/>
					</Flex>
				</SimpleGrid>
				<ManagementTable tableData={tableDataManagement} />
			</Flex>
		</Flex>
	);
}
