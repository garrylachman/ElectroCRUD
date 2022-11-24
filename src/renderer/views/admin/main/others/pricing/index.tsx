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
import { Badge, Box, Button, Flex, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import deloitteLogo from 'renderer/assets/svg/deloitte-logo.svg';
import georgiaLogo from 'renderer/assets/svg/georgia-logo.svg';
import googleLogo from 'renderer/assets/svg/google-logo.svg';
import microsoftLogo from 'renderer/assets/svg/microsoft-logo.svg';
import msnLogo from 'renderer/assets/svg/msn-logo.svg';
import zohoLogo from 'renderer/assets/svg/zoho-logo.svg';
// Custom components
import PricingLayout from 'layouts/auth/variants/Pricing';
import { useState } from 'react';
import Pack from 'renderer/views/admin/main/others/pricing/components/Pack';

function Pricing() {
	const [ activeButton, setActiveButton ] = useState({
		monthly: true,
		yearly: false
	});

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<PricingLayout
			image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
			contentTop={{ base: '140px', md: '14vh' }}
			contentBottom={{ base: '50px', lg: 'auto' }}>
			<Flex direction='column' alignSelf='center' justifySelf='center' overflow='hidden'>
				<Flex direction='column' textAlign='center' justifyContent='center' align='center' mb='38px'>
					<Text zIndex='1' fontSize='44px' color='white' fontWeight='700' maxW='550px' lineHeight='52px'>
						Flexible pricing that scales with your business
					</Text>
					<Text zIndex='1' fontSize='md' color='white' fontWeight='normal' mt='10px' mb='26px' maxW='400px'>
						See our pricing plans for all Premium and Free products & templates. Try now Horizon UI
						Dashboard
					</Text>
					<Badge
						w='max-content'
						mb={{ base: '60px', '2xl': '30px' }}
						fontSize='sm'
						bg='rgba(255,255,255,0.12)'
						color='white'
						fontWeight='bold'
						textTransform='unset'>
						No credit card required
					</Badge>
					<Flex mb={{ base: '0px', '2xl': '80px' }} zIndex='2' bg='brand.900' borderRadius='60px' p='6px'>
						<Button
							variant='no-hover'
							w='135px'
							h='40px'
							fontSize='xs'
							color={activeButton.monthly ? 'brand.500' : 'white'}
							bg={activeButton.monthly ? 'white' : 'transparent'}
							onClick={() => setActiveButton({ monthly: true, yearly: false })}
							borderRadius='60px'>
							MONTHLY
						</Button>
						<Button
							variant='no-hover'
							w='135px'
							h='40px'
							fontSize='xs'
							color={activeButton.yearly ? 'brand.500' : 'white'}
							bg={activeButton.yearly ? 'white' : 'transparent'}
							onClick={() => setActiveButton({ monthly: false, yearly: true })}
							borderRadius='60px'>
							YEARLY
						</Button>
					</Flex>
					<Stack
						direction={{ sm: 'column', xl: 'row' }}
						alignItems='flex-end'
						spacing='20px'
						mt='40px'
						mb='160px'>
						<Pack
							title='Freelancer'
							desc='Hit the ground running.'
							button='Start Free Trial'
							price={
								<Text textAlign='start' w='100%' color={textColor} fontSize='40px' fontWeight='bold'>
									{activeButton.monthly ? '$89' : '$159'}
									<Text as='span' color='secondaryGray.600' fontSize='40px' fontWeight='bold'>
										{activeButton.monthly ? '/mo' : '/yr'}
									</Text>
								</Text>
							}
							details='(Per subscriber per month)'
							benefits={[
								'Sell on your own terms',
								'Website, marketing tools & automations',
								'Bandwidth & storage is included',
								'We’ll get you onboarded'
							]}
						/>
						<Pack
							title='Company'
							desc='Power-up your business.'
							button='Get started'
							highlighted={true}
							price={
								<Text
									textAlign='start'
									w='max-content'
									color={textColor}
									fontSize='40px'
									fontWeight='bold'>
									{activeButton.monthly ? '$189' : '$259'}
									<Text as='span' color='secondaryGray.600' fontSize='40px' fontWeight='bold'>
										{activeButton.monthly ? '/mo' : '/yr'}
									</Text>
								</Text>
							}
							details='(Per subscriber per month)'
							benefits={[
								'Live chat & countdowns',
								'Website, marketing tools & automations',
								'Bandwidth & storage is included',
								'We’ll get you onboarded'
							]}
						/>
						<Pack
							title='Freelancer'
							desc='Hit the ground running.'
							button='Start Free Trial'
							price={
								<Text color={textColor} fontSize='40px' fontWeight='bold'>
									+1 982 66 88 99
								</Text>
							}
							details='(Available in all countries)'
							benefits={[
								'We’ll migrate you for free',
								'Live chat & countdowns',
								'Bandwidth & storage is included',
								'We’ll get you onboardedd'
							]}
						/>
					</Stack>
					<Flex direction='column' mb='160px' justify='center' align='center'>
						<Text
							color={textColor}
							fontWeight='bold'
							fontSize='34px'
							mb={{ sm: '32px', xl: '16px' }}
							maxW={{ sm: '250px', md: '100%' }}
							textAlign='center'>
							More than 25,000 users use Horizon
						</Text>
						<SimpleGrid
							columns={{ sm: 2, md: 3, lg: 6 }}
							spacingX={{ sm: '65px', lg: '40px', xl: '65px' }}
							spacingY={{ sm: '30px' }}>
							<Image src={googleLogo} alignSelf='center' justifySelf='center' />
							<Image src={msnLogo} alignSelf='center' justifySelf='center' />
							<Image src={microsoftLogo} alignSelf='center' justifySelf='center' />
							<Image src={zohoLogo} alignSelf='center' justifySelf='center' />
							<Image src={georgiaLogo} alignSelf='center' justifySelf='center' />
							<Image src={deloitteLogo} alignSelf='center' justifySelf='center' />
						</SimpleGrid>
					</Flex>
					<Text color={textColor} fontWeight='bold' fontSize='34px' mb='60px'>
						Frequently Asked Questions
					</Text>
					<SimpleGrid columns={{ md: 1, lg: 2 }} spacing='60px' maxW='1170px' mx='auto'>
						<Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									Are the images, fonts, and icons free to use?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									These products are not Wordpress themes, however, they can be integrated in
									Wordpress by an experienced web developer.
								</Text>
							</Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									Do these themes work with Wordpress?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									These products are not Wordpress themes, however, they can be integrated in
									Wordpress by an experienced web developer.
								</Text>
							</Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									What does the Included Documentation feature refer to?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									It means that each theme within the Exclusive Digital Bundle promotion has a
									thorough and up to date documentation on how to get started with the product and
									each components and plugin is properly explained.
								</Text>
							</Box>
						</Box>
						<Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									Are the themes available with only classic CSS and without Sass as well?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									Yes, they are. Each theme has a html&css folder which contains the theme with
									classic HTML, CSS, and Javascript files.
								</Text>
							</Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									If I purchased a Freelancer/Company License, how can I upgrade to the
									Company/Enterprise License?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									In case you have already purchased a license, but you want to upgrade, you can just
									send us a message using the contact page and we will send you a discount code so you
									will only pay the difference for the upgrade.
								</Text>
							</Box>
							<Box mb='60px'>
								<Text textAlign='start' color={textColor} fontWeight='500' fontSize='2xl' mb='12px'>
									What is the difference on Free and PRO products?
								</Text>
								<Text textAlign='start' color='secondaryGray.600' fontWeight='500' fontSize='md'>
									The differences between the Free and Pro products consists of the number of
									components, plugins, sections, pages in each
								</Text>
							</Box>
						</Box>
					</SimpleGrid>
				</Flex>
			</Flex>
		</PricingLayout>
	);
}

export default Pricing;
