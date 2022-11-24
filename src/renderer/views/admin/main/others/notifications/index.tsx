/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	CloseButton,
	Flex,
	Grid,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';

function Alerts() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
			<Grid
				templateColumns={{ sm: '1fr', lg: 'repeat(2, 1fr)' }}
				templateRows='repeat(2, 1fr)'
				gap='24px'
				mb='24px'>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Solid Alert - Left
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert borderRadius='8px' status='error' variant='solid'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='warning' variant='solid'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='info' colorScheme='brand' variant='solid'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='success' variant='solid'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
					</Stack>
				</Card>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Solid Alert - Center
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert
							status='error'
							variant='solid'
							justifyContent='center'
							borderRadius='8px'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px' justifySelf='center'>
								Title Here
							</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='warning'
							variant='solid'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='info'
							colorScheme='brand'
							variant='solid'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='success'
							variant='solid'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
					</Stack>
				</Card>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Subtle Alert - Left
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert borderRadius='8px' status='error' variant='subtle'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='warning' variant='subtle'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='info' colorScheme='brand' variant='subtle'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert borderRadius='8px' status='success' variant='subtle'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
					</Stack>
				</Card>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Subtle Alert - Center
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert
							status='error'
							variant='subtle'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px' justifySelf='center'>
								Title Here
							</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='warning'
							variant='subtle'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='info'
							colorScheme='brand'
							variant='subtle'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
						<Alert
							status='success'
							variant='subtle'
							borderRadius='8px'
							justifyContent='center'
							alignItems='center'>
							<AlertIcon />
							<AlertTitle mr='12px'>Title Here</AlertTitle>
							<AlertDescription>Description here.</AlertDescription>
							<CloseButton
								position='absolute'
								fontSize={{ sm: '8px', md: '12px' }}
								right={{ sm: '-4px', md: '8px' }}
								top={{ sm: '-4px', md: '8px' }}
							/>
						</Alert>
					</Stack>
				</Card>
			</Grid>
			<Stack
				direction={{ sm: 'column', lg: 'row' }}
				spacing='24px'
				w='100%'
				justifySelf='center'
				alignSelf='center'
				maxW='1024px'>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Solid MultiAlert
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert borderRadius='8px' status='error' variant='solid'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='warning' variant='solid'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='info' colorScheme='brand' variant='solid'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='success' variant='solid'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
					</Stack>
				</Card>
				<Card>
					<Text color={textColor} fontSize='2xl' mb='20px' fontWeight='bold'>
						Subtle MultiAlert
					</Text>

					<Stack direction='column' spacing='55px' w='100%'>
						<Alert borderRadius='8px' status='error' variant='subtle'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='warning' variant='subtle'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='info' colorScheme='brand' variant='subtle'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
						<Alert borderRadius='8px' status='success' variant='subtle'>
							<Flex>
								<AlertIcon />
								<Flex direction='column'>
									<AlertTitle mr='12px'>Title Here</AlertTitle>
									<AlertDescription>Description here.</AlertDescription>
								</Flex>
							</Flex>
							<CloseButton position='absolute' right='8px' top='8px' />
						</Alert>
					</Stack>
				</Card>
			</Stack>
		</Flex>
	);
}

export default Alerts;
