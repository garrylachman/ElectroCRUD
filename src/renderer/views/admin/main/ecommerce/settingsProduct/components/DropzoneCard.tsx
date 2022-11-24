// Chakra imports
import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'renderer/components/card/Card';
import Dropzone from 'renderer/views/admin/main/ecommerce/settingsProduct/components/Dropzone';

// Assets
import { MdOutlineCloudUpload } from 'react-icons/md';

export default function DropzoneCard(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const brand = useColorModeValue('brand.500', 'brand.400');

	return (
		<Card p='30px' {...rest}>
			<Text color={textColor} fontSize='xl' fontWeight='700' mb='30px'>
				Product Images
			</Text>
			<Dropzone
				content={
					<Box maxW='100%'>
						<Icon as={MdOutlineCloudUpload} w='80px' h='80px' color={textColor} />
						<Text
							mb='12px'
							fontSize='lg'
							w='100%'
							maxW='100%'
							fontWeight='700'
							color={textColor}
							whiteSpace='pre-wrap'>
							Drop your images here, or{' '}
							<Text as='span' fontSize='lg' fontWeight='700' color={brand}>
								click to browse
							</Text>
						</Text>
						<Text
							fontSize='sm'
							fontWeight='500'
							color='secondaryGray.500'
							white-space='pre-wrap !important'>
							1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
						</Text>
					</Box>
				}
			/>
		</Card>
	);
}
