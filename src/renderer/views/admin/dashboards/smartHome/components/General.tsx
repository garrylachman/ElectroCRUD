// Chakra imports
import { Flex, Icon, Select, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
import Controller from 'renderer/views/admin/dashboards/smartHome/components/Controller';

// Assets
import { MdAcUnit, MdWifi, MdThermostat, MdOutlineLightbulb, MdOutlineLocationOn } from 'react-icons/md';

export default function CircularProgress() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card p='30px'>
			<Text fontSize='lg' lineHeight='100%' color={textColor} fontWeight='bold'>
				General Controllers
			</Text>
			<Flex align='center' mb='20px'>
				<Icon as={MdOutlineLocationOn} color='secondaryGray.600' h='16px' w='16px' />
				<Select fontSize='sm' variant='subtle' defaultValue='Dinner' width='unset' ms='-10px' fontWeight='700'>
					<option value='Dinner'>Dinner Room</option>
					<option value='Living'>Living Room</option>
					<option value='Bedroom'>Bedroom</option>
				</Select>
			</Flex>

			<SimpleGrid columns={2} gap='20px'>
				<Controller initial={true} text='Air Conditioner' onValue='ON' offValue='OFF' icon={MdAcUnit} />
				<Controller initial={true} text='Wi-Fi' onValue='Active' offValue='Inactive' icon={MdWifi} />
				<Controller initial={true} text='Thermostat' onValue='ON' offValue='OFF' icon={MdThermostat} />
				<Controller initial={false} text='Lights' onValue='ON' offValue='OFF' icon={MdOutlineLightbulb} />
			</SimpleGrid>
		</Card>
	);
}
