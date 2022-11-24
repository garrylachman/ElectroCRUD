// Chakra imports
import { Badge, List, ListItem, ListIcon, Text, Button, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';
// Assets
import { BsCircleFill } from 'react-icons/bs';

export default function Pack(props: {
	title: string;
	desc: string;
	button: string;
	price: JSX.Element | string;
	details: string;
	benefits: string[];
	highlighted?: boolean;
}) {
	const { title, desc, button, price, details, benefits, highlighted } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card
			p='20px'
			pb='45px'
			pt={highlighted ? '60px' : '30px'}
			w={{ sm: '300px', md: '650px', lg: '375px' }}
			alignItems='flex-start'
			justifyContent='flex-start'
			overflow='unset !important'>
			<Badge
				display={highlighted ? 'block' : 'none'}
				w='max-content'
				position='absolute'
				fontSize='sm'
				color='orange.500'
				bg='orange.100'
				fontWeight='bold'
				textTransform='unset'
				left='50%'
				borderRadius='70px'
				transform='translate(-50%,-250%)'>
				Most popular plan
			</Badge>
			<Text fontSize='30px' color={textColor} fontWeight='700'>
				{title}
			</Text>
			<Text mb='30px' fontSize='md' color='secondaryGray.600' fontWeight='500'>
				{desc}
			</Text>
			<Button w='100%' variant={highlighted ? 'brand' : 'lightBrand'} mb='30px'>
				{button}
			</Button>
			{price}
			<Text fontSize='md' color='secondaryGray.600' fontWeight='500'>
				{details}
			</Text>
			<List spacing={3} justifyContent='flex-start'>
				{benefits.map((benefit, index) => (
					<ListItem
						key={index}
						display='flex'
						textAlign='start'
						fontSize='md'
						fontWeight='500'
						color={textColor}
						alignItems='center'
						lineHeight='100%'
						mt='30px !important'>
						<ListIcon w='10px' h='10px' as={BsCircleFill} my='auto' color={textColor} />
						{benefit}
					</ListItem>
				))}{' '}
			</List>
		</Card>
	);
}
