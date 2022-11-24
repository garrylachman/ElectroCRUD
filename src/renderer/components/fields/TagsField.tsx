// Chakra imports
import { Flex, Box, FormLabel, Input, Tag, TagCloseButton, TagLabel, useColorModeValue } from '@chakra-ui/react';
// Custom components
import { useState } from 'react';

function TagsField(props: {
	label?: string;
	id?: string;
	placeholderTags?: { name: string; id: number }[];
	[x: string]: any;
}) {
	const { label, id, placeholderTags, ...rest } = props;
	let initialTags = [
		{
			name: 'chakra-ui',
			id: 1
		},
		{
			name: 'react',
			id: 2
		},
		{
			name: 'javascript',
			id: 3
		}
	];
	if (placeholderTags) initialTags = placeholderTags;
	const [ tags, setTags ] = useState(initialTags);

	const keyPress = (e: any) => {
		if (e.keyCode === 13) {
			setTags([
				...tags,
				{
					name: e.target.value,
					id: tags.length === 0 ? 1 : tags[tags.length - 1].id + 1
				}
			]);
			e.target.value = '';
		}
	};

	let borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
	let bg = useColorModeValue('brand.500', 'brand.400');
	return (
		<Box>
			<FormLabel htmlFor={id} fontWeight='bold' fontSize='sm' mb='8px'>
				{label}
			</FormLabel>
			<Flex
				direction='row'
				p='12px'
				wrap='wrap'
				bg='transparent'
				border='1px solid'
				borderColor={borderColor}
				borderRadius='16px'
				_focus={{ borderColor: 'teal.300' }}
				minH='40px'
				h='stretch'
				cursor='text'
				{...rest}>
				{tags.map((tag, index) => {
					return (
						<Tag
							fontSize='xs'
							h='25px'
							mb='6px'
							me='6px'
							borderRadius='12px'
							variant='solid'
							bg={bg}
							key={index}>
							<TagLabel w='100%'>{tag.name}</TagLabel>
							<TagCloseButton
								justifySelf='flex-end'
								color='white'
								onClick={() => setTags([ ...tags.filter((element) => element.id !== tag.id) ])}
							/>
						</Tag>
					);
				})}
				<Input
					variant='main'
					bg='transparent'
					border='none'
					p='0px'
					onKeyDown={(e) => keyPress(e)}
					fontSize='sm'
				/>
			</Flex>
		</Box>
	);
}

export default TagsField;
