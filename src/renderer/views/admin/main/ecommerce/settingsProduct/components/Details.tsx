import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import InputField from 'renderer/components/fields/input-field';
import TagsField from 'renderer/components/fields/tags-field';

// Chakra imports
export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card mb='20px'>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Pricing Details
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change your product pricing details
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<Flex direction='column'>
						<SimpleGrid mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
							<InputField mb='0px' me='30px' id='price' label='Price' placeholder='eg. $99' />
							<InputField mb='0px' id='uniqueCode' label='Unique Code' placeholder='eg. 4030120241' />
						</SimpleGrid>
						<Flex direction='column'>
							<FormLabel
								ms='10px'
								htmlFor='currency'
								fontSize='sm'
								color={textColorPrimary}
								fontWeight='bold'
								_hover={{ cursor: 'pointer' }}>
								Currency
							</FormLabel>
							<Select
								fontSize='sm'
								id='currency'
								variant='main'
								h='44px'
								maxH='44px'
								me='20px'
								defaultValue='usd'>
								<option value='usd'>USD</option>
								<option value='eur'>EUR</option>
								<option value='gbp'>GBP</option>
							</Select>
						</Flex>
					</Flex>
					<TagsField
						id='description'
						label='Description'
						mb='0px'
						h='140px'
						placeholderTags={[
							{
								name: 'chair',
								id: 1
							},
							{
								name: 'furniture',
								id: 2
							},
							{
								name: 'elegant',
								id: 3
							}
						]}
					/>
				</SimpleGrid>
			</Card>
		</FormControl>
	);
}
