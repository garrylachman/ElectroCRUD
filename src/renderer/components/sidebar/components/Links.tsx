import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  MdAdd,
  MdEdit,
  MdHome,
  MdSettings,
  MdTableView,
  MdViewList,
} from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MotionBox } from 'renderer/components/motions/motion-box';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';

export function SidebarLinks() {
  const sessionState = useAppSelector((state) => state.session);
  const viewsState = useAppSelector((state) => state.views);

  const sessionViews = useMemo(() => {
    if (sessionState.account && sessionState.isConnected) {
      return ViewsReducer.getSelectors()
        .selectAll(viewsState)
        .filter((view) => view.accountId === sessionState.account?.id);
    }
    return [];
  }, [sessionState, viewsState]);

  const location = useLocation();
  const navigate = useNavigate();
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600'
  );
  const activeIcon = useColorModeValue('brand.500', 'white');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const viewsLinks = [
    { to: 'add', text: 'Add View', icon: MdAdd },
    ...sessionViews.map((view) => ({
      to: view.id,
      text: view.name,
      icon: MdTableView,
    })),
  ];

  const links = [
    { to: 'settings', text: 'Settings', icon: MdSettings, subLinks: [] },
    { to: 'accounts', text: 'Accounts', icon: MdHome, subLinks: [] },
    { to: 'views', text: 'Views', icon: MdViewList, subLinks: viewsLinks },
  ];

  return (
    <Flex
      align="left"
      justifyContent="space-between"
      w="100%"
      flexDirection="column"
      as={MotionBox}
    >
      {links.map((link) => (
        <HStack
          key={link.to}
          mb="6px"
          spacing={activeRoute(link.to) ? '22px' : '26px'}
          flexDirection="column"
          alignItems="flex-start"
        >
          <>
            <NavLink to={link.to}>
              <Flex w="100%" alignItems="center" justifyContent="space-between">
                <Box
                  color={activeRoute(link.to) ? activeIcon : inactiveColor}
                  me="12px"
                  display="inline-flex"
                >
                  <Icon
                    as={link.icon}
                    width="20px"
                    height="20px"
                    color="inherit"
                  />
                </Box>
                <Text
                  me="auto"
                  color={
                    activeRoute(link.to) ? activeColor : 'secondaryGray.600'
                  }
                  fontWeight="500"
                  fontSize="md"
                >
                  {link.text}
                </Text>
              </Flex>
            </NavLink>
            <Collapse
              in={activeRoute(link.to)}
              style={{ width: '-webkit-fill-available', overflow: 'unset' }}
            >
              {activeRoute(link.to) && link.subLinks.length > 0 ? (
                <LayoutGroup>
                  <VStack alignItems="start" pt={2} color='secondaryGray.600' fontWeight="500">
                    {link.subLinks.map((subLink, subLinksIndex) => (
                      <motion.div
                        initial={{
                          x: -50,
                          scaleY: 0,
                          position: 'relative',
                          opacity: 0,
                        }}
                        animate={{ x: 0, scaleY: 1, opacity: 1 }}
                        exit={{ x: -20, scaleY: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          bounce: 0.7,
                          type: 'spring',
                          delay: subLinksIndex * 0.1,
                          ease: 'easeOut',
                        }}
                        whileHover={{
                          color: '#422AFB',
                          scale: 1.1,
                          transition: {
                            duration: 0.3,
                            delay: 0,
                          },
                        }}
                        whileTap={{ scaleY: [0.8, 1.1, 0.5, 1.4, 1], transition: { delay: 0, duration: 0.3, } }}
                      >
                        <Flex
                          justifyContent="space-between"
                          borderRightColor="white"
                          borderRightWidth="5px"
                          w="100%"
                        >
                          <NavLink
                            to={`${link.to}/${subLink.to}`}
                            key={`${link.to}/${subLink.to}`}
                          >
                            <Flex
                              w="100%"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box
                                color={
                                  activeRoute(`${link.to}/${subLink.to}`)
                                    ? activeIcon
                                    : "inherit"
                                }
                                me="12px"
                                display="inline-flex"
                              >
                                <Icon
                                  as={subLink.icon}
                                  width="20px"
                                  height="20px"
                                  color="inherit"
                                />
                              </Box>
                              <Text
                                me="auto"
                                color={
                                  activeRoute(`${link.to}/${subLink.to}`)
                                    ? activeColor
                                    : 'inherit'
                                }
                                fontWeight="inherit"
                                fontSize="md"
                              >
                                {subLink.text}
                              </Text>
                            </Flex>
                          </NavLink>
                          <Button
                            onClick={() =>
                              navigate(`${link.to}/${subLink.to}/edit`)
                            }
                            borderRadius={30}
                            borderRightRadius={0}
                            variant="ghost"
                            size="xs"
                          >
                            <Icon as={MdEdit} />
                          </Button>
                        </Flex>
                      </motion.div>
                    ))}
                  </VStack>
                </LayoutGroup>
              ) : undefined}
            </Collapse>
          </>
        </HStack>
      ))}
    </Flex>
  );
}

export default SidebarLinks;
