// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { HSeparator } from 'renderer/components/separator/Separator';

// Custom components
import ReceiptTable from 'renderer/views/admin/main/ecommerce/orderDetails/components/ReceiptTable';
import tableDataReceipt from 'renderer/views/admin/main/ecommerce/orderDetails/variables/tableDataReceipt';

export default function Content(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	let paid = 0;
	let total = 0;
	for (let i = 0; i < tableDataReceipt.length; i++) {
		total = total + tableDataReceipt[i].amount;
	}
	return (
		<Flex direction='column' p={{ base: '20px', md: '34px' }} px={{ base: '0px', md: '34px' }} {...rest}>
			<ReceiptTable tableData={tableDataReceipt} />
			<Flex mt='70px' direction={{ base: 'column', md: 'row' }}>
				<Box me='auto' mb={{ base: '40px', lg: '0px' }}>
					<Text fontSize='lg' fontWeight='700' color={textColor}>
						Note
					</Text>
					<Text fontSize='md' fontWeight='400' color='secondaryGray.600' maxW='322px'>
						Ship all the ordered items together by Friday and I send you an email, please check. Thanks!
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
