/*eslint-disable*/

import { Flex, Link, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
	const textColor = useColorModeValue('gray.400', 'white');
	return (
		<Flex
			w={{ base: '100%', xl: '1170px' }}
			maxW={{ base: '90%', xl: '1170px' }}
			zIndex='1.5'
			flexDirection={{
				base: 'column',
				xl: 'row'
			}}
			alignItems={{
				base: 'center',
				xl: 'start'
			}}
			justifyContent='space-between'
			px={{ base: '0px', xl: '0px' }}
			pb='30px'
			mx='auto'>
			<Text
				color={textColor}
				textAlign={{
					base: 'center',
					xl: 'start'
				}}
				mb={{ base: '20px', xl: '0px' }}>
				{' '}
				&copy; {1900 + new Date().getFullYear()}
				<Text as='span' fontWeight='500' ms='4px'>
					Horizon UI. All Rights Reserved. Made with love by
					<Link mx='3px' color={textColor} href='https://www.simmmple.com' target='_blank' fontWeight='700'>
						Simmmple!
					</Link>
				</Text>
			</Text>
			<List display='flex'>
				<ListItem
					me={{
						base: '20px',
						md: '44px'
					}}>
					<Link fontWeight='500' color={textColor} href='mailto:hello@simmmple.com'>
						Support
					</Link>
				</ListItem>
				<ListItem
					me={{
						base: '20px',
						md: '44px'
					}}>
					<Link fontWeight='500' color={textColor} href='https://www.simmmple.com/licenses'>
						License
					</Link>
				</ListItem>
				<ListItem
					me={{
						base: '20px',
						md: '44px'
					}}>
					<Link fontWeight='500' color={textColor} href='https://simmmple.com/terms-of-service'>
						Terms of Use
					</Link>
				</ListItem>
				<ListItem>
					<Link fontWeight='500' color={textColor} href='https://www.blog.simmmple.com/'>
						Blog
					</Link>
				</ListItem>
			</List>
		</Flex>
	);
}
