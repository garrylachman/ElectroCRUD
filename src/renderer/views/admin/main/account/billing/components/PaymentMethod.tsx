// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';

// Assets
import { MdEdit } from 'react-icons/md';
import { MastercardIcon, VisaIcon } from 'renderer/components/icons/Icons';

export default function PaymentMethod(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColorSecondary = useColorModeValue('secondaryGray.500', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('#4318FF', 'white');
	const borderColor = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
	return (
		<Card flexDirection='column' w='100%' {...rest} p='34px' h='stretch'>
			<Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%' mb='33px'>
				Payment Method
			</Text>
			<Flex direction='column'>
				<Flex
					align='center'
					border='1px solid'
					borderColor={borderColor}
					borderRadius='16px'
					p='22px 26px'
					mb='20px'>
					<MastercardIcon w='24px' h='24px' mt='3px' me='10px' />
					<Text me='auto' fontSize='md' fontWeight='500' color={textColorSecondary}>
						7812 2139 0823 XXXX
					</Text>
					<Flex cursor='pointer' h='max-content' w='max-content'>
						<Icon color={textColorSecondary} as={MdEdit} w='20px' h='20px' />
					</Flex>
				</Flex>
				<Flex align='center' border='1px solid' borderColor={borderColor} borderRadius='16px' p='22px 26px'>
					<VisaIcon color={iconColor} w='24px' h='24px' mt='3px' me='10px' />
					<Text me='auto' fontSize='md' fontWeight='500' color={textColorSecondary}>
						7812 2139 0823 XXXX
					</Text>
					<Flex cursor='pointer' h='max-content' w='max-content'>
						<Icon color={textColorSecondary} as={MdEdit} w='20px' h='20px' />
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
