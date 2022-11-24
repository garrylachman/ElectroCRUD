// Chakra imports
import { Box, Flex, FormLabel, Switch, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
export default function Default(props: {
	id: string;
	label?: string;
	isChecked?: boolean;
	onChange?: () => void;
	desc?: string;
	textWidth?: string | number;
	reversed?: boolean;
	[x: string]: any;
}) {
	const { id, label, isChecked, onChange, desc, textWidth, reversed, fontSize, ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Box w='100%' fontWeight='500' {...rest}>
			{reversed ? (
				<Flex align='center' borderRadius='16px'>
					{isChecked && onChange ? (
						<Switch
							isChecked={isChecked}
							id={id}
							variant='main'
							colorScheme='brandScheme'
							size='md'
							onChange={onChange}
						/>
					) : (
						<Switch id={id} variant='main' colorScheme='brandScheme' size='md' />
					)}
					<FormLabel
						ms='15px'
						htmlFor={id}
						_hover={{ cursor: 'pointer' }}
						flexDirection='column'
						mb='0px'
						maxW={textWidth ? textWidth : '75%'}>
						<Text color={textColorPrimary} fontSize='md' fontWeight='500'>
							{label}
						</Text>
						<Text color='secondaryGray.600' fontSize={fontSize ? fontSize : 'md'}>
							{desc}
						</Text>
					</FormLabel>
				</Flex>
			) : (
				<Flex justify='space-between' align='center' borderRadius='16px'>
					<FormLabel
						htmlFor={id}
						_hover={{ cursor: 'pointer' }}
						flexDirection='column'
						maxW={textWidth ? textWidth : '75%'}>
						<Text color={textColorPrimary} fontSize='md' fontWeight='500'>
							{label}
						</Text>
						<Text color='secondaryGray.600' fontSize={fontSize ? fontSize : 'md'}>
							{desc}
						</Text>
					</FormLabel>
					{isChecked && onChange ? (
						<Switch
							isChecked={isChecked}
							id={id}
							variant='main'
							colorScheme='brandScheme'
							size='md'
							onChange={onChange}
						/>
					) : (
						<Switch id={id} variant='main' colorScheme='brandScheme' size='md' />
					)}
				</Flex>
			)}
		</Box>
	);
}
