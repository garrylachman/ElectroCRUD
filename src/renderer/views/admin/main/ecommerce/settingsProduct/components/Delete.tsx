// Chakra imports
import { Button, LightMode } from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';

export default function Settings() {
	// Chakra Color Mode
	return (
		<Card p='60px 30px' flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
			<LightMode>
				<Button
					colorScheme='red'
					variant='outline'
					p='15px 40px'
					fontSize='sm'
					fontWeight='500'
					ms={{ base: '0', md: 'auto' }}
					mb={{ base: '20px', md: '0' }}
					me={{ base: '0', md: '20px' }}
					_hover={{ bg: 'whiteAlpha.100' }}
					_focus={{ bg: 'transparent' }}
					_active={{ bg: 'transparent' }}>
					Delete product
				</Button>
			</LightMode>
			<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500'>
				Save changes
			</Button>
		</Card>
	);
}
