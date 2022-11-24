import { Avatar, Button, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components

export default function Comment(props: {
	avatar: string;
	name: string;
	text: string;
	tags?: string[];
	time: string;
	[x:string]:any
}) {
	const { avatar, name, text, tags, time, ...rest } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const textGray = useColorModeValue('#68769F', 'secondaryGray.600');
	return (
		<Flex mb='30px' {...rest}>
			<Avatar src={avatar} w='50px' h='50px' me='15px' />
			<Flex direction='column'>
				<Text color={textColor} fontWeight='400' fontSize='md' mt='6px'>
					<Text as='span' fontSize='md' color={textColor} fontWeight='700'>
						{name}
					</Text>{' '}
					{text}
				</Text>
				<Flex>
					{tags ? (
						tags.map((tag, key) => {
							return (
								<Link
									href={`#${tag}`}
									me='4px'
									key={key}
									color='secondaryGray.600'
									fontSize='md'
									fontWeight='400'>
										<>#{tag}</>
								</Link>
							);
						})
					) : null}
				</Flex>
				<Flex align='center'>
					<Text fontSize='md' color={textColorSecondary} fontWeight='500'>
						{time}
					</Text>
					<Button color={textGray} variant='no-hover' fontWeight='500' boxShadow='none' w='max-content'>
						Reply
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
