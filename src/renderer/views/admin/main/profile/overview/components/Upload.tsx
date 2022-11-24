// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'renderer/components/card/Card';

// Assets
import { MdUpload } from 'react-icons/md';
import Dropzone from 'renderer/views/admin/main/profile/overview/components/Dropzone';

export default function Upload(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	return (
		<Card {...rest} mb='20px' alignItems='center' p='20px'>
			<Flex h='100%' direction={{ base: 'column', '2xl': 'row' }}>
				<Dropzone
					w={{ base: '100%', '2xl': '268px' }}
					me='36px'
					maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					minH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					content={
						<Box>
							<Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
							<Flex justify='center' mx='auto' mb='12px'>
								<Text fontSize='xl' fontWeight='700' color={brandColor}>
									Upload Files
								</Text>
							</Flex>
							<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
								PNG, JPG and GIF files are allowed
							</Text>
						</Box>
					}
				/>
				<Flex direction='column' pe='34px'>
					<Text
						color={textColorPrimary}
						fontWeight='bold'
						textAlign='start'
						fontSize='2xl'
						mt={{ base: '20px', '2xl': '50px' }}>
						Complete your profile
					</Text>
					<Text
						color={textColorSecondary}
						fontSize='md'
						my={{ base: 'auto', '2xl': '10px' }}
						mx='auto'
						textAlign='start'>
						Stay on the pulse of distributed projects with an anline whiteboard to plan, coordinate and
						discuss
					</Text>
					<Flex w='100%' mb='50px' mt={{ base: '20px', '2xl': 'auto' }}>
						<Button me='auto' w='140px' variant='brand' fontWeight='500'>
							Publish now
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
