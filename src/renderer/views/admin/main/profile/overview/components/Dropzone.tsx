// Chakra imports
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets

import { useDropzone } from 'react-dropzone';

function Dropzone(props: { content: JSX.Element; [x: string]: any }) {
	const { content, ...rest } = props;
	const { getRootProps, getInputProps } = useDropzone();
	const bg = useColorModeValue('gray.100', 'navy.700');
	const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
	return (
		<Flex
			align='center'
			justify='center'
			bg={bg}
			border='1px dashed'
			borderColor={borderColor}
			borderRadius='16px'
			w='100%'
			h='max-content'
			minH='100%'
			cursor='pointer'
			{...getRootProps({ className: 'dropzone' })}
			{...rest}>
			<input {...getInputProps()} />
			<Button variant='no-effects'>{content}</Button>
		</Flex>
	);
}

export default Dropzone;
