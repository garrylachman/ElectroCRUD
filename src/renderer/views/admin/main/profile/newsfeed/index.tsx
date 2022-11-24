/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

=========================================================
* Horizon UI Dashboard PRO - v1.0.2
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Flex, Text, useColorModeValue, Box } from '@chakra-ui/react';

// Assets
import postImage from 'renderer/assets/img/profile/postImage.png';
import avatar10 from 'renderer/assets/img/avatars/avatar10.png';
import avatar2 from 'renderer/assets/img/avatars/avatar2.png';
import avatar4 from 'renderer/assets/img/avatars/avatar4.png';
// Custom components
import { VSeparator } from 'renderer/components/separator/Separator';
import Trending from 'renderer/views/admin/main/profile/newsfeed/components/Trending';
import Stories from 'renderer/views/admin/main/profile/newsfeed/components/Stories';
import Post from 'renderer/views/admin/main/profile/newsfeed/components/Post';
import Comment from 'renderer/components/dataDisplay/Comment';
import Filter from 'renderer/views/admin/main/profile/newsfeed/components/Filter';

export default function Newsfeed() {
	// Chakra color mode
	const textColor = useColorModeValue('gray.700', 'white');
	const paleGray = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');

	return (
		<Flex direction={{ base: 'column', xl: 'row' }} pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Flex direction='column' mb={{ base: '20px', xl: 'unset' }} maxW={{ xl: '65%', '2xl': '72%' }}>
				<Stories mb='50px' />
				<Flex mb='20px'>
					<Text me='auto' ms='20px' fontSize='2xl' fontWeight='700' color={textColor}>
						Feeds
					</Text>
					<Filter />
				</Flex>
				<Post
					likes='28.5k'
					comments='34'
					avatar={avatar10}
					name='Esthera William'
					username='@esthera.william'
					image={postImage}
					shares='156'
					saves='20'
					you={avatar4}
					commentBlocks={
						<Box>
							<Comment
								avatar={avatar10}
								name='@esthera.william'
								text='I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They&#39;re slowed down by their perception of themselves. If you&#39;re taught you can’t do anything, you won’t do anything. I was taught I could do everything.'
								tags={[ 'photography', 'portrait', 'image' ]}
								time='24 mins ago'
								pe='20px'
							/>
							<Comment
								avatar={avatar2}
								name='@roberto.michael91  '
								text='Wow! This is an amazing point of view! The time is now for it to be okay to be great! 🙏🏼😁'
								time='21 mins ago'
								pe='20px'
							/>{' '}
						</Box>
					}
				/>
			</Flex>
			<VSeparator mx='20px' bg={paleGray} display={{ base: 'none', xl: 'flex' }} />
			<Trending
				w={{ base: '100%', xl: '500px', '2xl': '400px' }}
				maxH={{ base: '100%', xl: '1170px', '2xl': '100%' }}
			/>
		</Flex>
	);
}
