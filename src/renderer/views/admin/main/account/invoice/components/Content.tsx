// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import InvoiceTable from 'renderer/views/admin/main/account/invoice/components/InvoiceTable';
import tableDataInvoice from 'renderer/views/admin/main/account/invoice/variables/tableDataInvoice';

// Assets
import { HSeparator } from 'renderer/components/separator/Separator';

export default function Content(props: { [x: string]: any }) {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const bgCard = useColorModeValue('white', 'navy.700');
	let paid = 0;
	let total = 0;
	for (let i = 0; i < tableDataInvoice.length; i++) {
		total = total + tableDataInvoice[i].amount;
	}
	return (
		<Flex direction='column' p={{ base: '10px', md: '60px' }}>
			<Card backgroundRepeat='no-repeat' bg={bgCard} p='30px' mb='30px' mt='-100px'>
				<Flex direction={{ base: 'column', md: 'row' }}>
					<Flex direction='column' me='auto' mb={{ base: '30px', md: '0px' }}>
						<Text w='max-content' mb='8px' fontSize='md' color='secondaryGray.600' fontWeight='400'>
							Invoice for:
						</Text>
						<Text color={textColor} fontSize='xl' fontWeight='700'>
							Anthony Petterson
						</Text>
						<Text
							w='max-content'
							mb='10px'
							fontSize='md'
							color='secondaryGray.600'
							fontWeight='400'
							lineHeight='26px'>
							37 Avenue, Boggstown,
							<br /> Indiana, United States 84219
						</Text>
					</Flex>
					<Flex direction='column'>
						<Text w='max-content' mb='4px' fontSize='md' color='secondaryGray.600' fontWeight='400'>
							Amount due
						</Text>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							$395.00
						</Text>
						<Text
							w='max-content'
							mb='10px'
							fontSize='md'
							p='6px 12px'
							bg='linear-gradient(108.54deg, #FF416C 6.56%, #FF4B2B 95.2%)'
							color='white'
							borderRadius='10px'
							fontWeight='700'>
							Due on Sep 30, 2022
						</Text>
					</Flex>
				</Flex>
			</Card>
			<InvoiceTable tableData={tableDataInvoice} />
			<Flex mt='70px' direction={{ base: 'column', md: 'row' }}>
				<Box me='auto' mb={{ base: '40px', md: '0px' }}>
					<Text fontSize='lg' fontWeight='700' color={textColor}>
						Note
					</Text>
					<Text fontSize='md' fontWeight='400' color='secondaryGray.600' maxW='292px'>
						Hi Anthony, please take a look at the this invoice from September. Let me know if you have any
						questions, thanks.
					</Text>
				</Box>
				<Box>
					<Flex align='center' justifyContent='space-between' mb='12px'>
						<Text textAlign='end' color={textColor} fontSize='lg' fontWeight='400'>
							Total
						</Text>
						<Text color={textColor} fontSize='lg' fontWeight='700' maxW='292px'>
							${total}
						</Text>
					</Flex>
					<Flex align='center' justifyContent='space-between'>
						<Text me='70px' fontWeight='400' textAlign='end' color={textColor} fontSize='lg'>
							Paid to date
						</Text>
						<Text color={textColor} fontSize='lg' fontWeight='700' maxW='292px'>
							${paid}
						</Text>
					</Flex>
					<HSeparator my='20px' />
					<Flex align='center' justifyContent='space-between'>
						<Text me='70px' fontWeight='400' textAlign='end' color={textColor} fontSize='lg'>
							Amount to pay
						</Text>
						<Text color={textColor} fontSize='lg' fontWeight='700' maxW='292px'>
							${total - paid}
						</Text>
					</Flex>
				</Box>
			</Flex>
		</Flex>
	);
}
