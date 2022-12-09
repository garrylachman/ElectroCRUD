import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Collapse,
  Button,
} from '@chakra-ui/react';
import { MdHome, MdViewList, MdAdd, MdTableView, MdEdit } from 'react-icons/md';
import { useAppSelector } from 'renderer/store/hooks';
import { useMemo } from 'react';
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
    { to: 'accounts', text: 'Accounts', icon: MdHome, subLinks: [] },
    { to: 'views', text: 'Views', icon: MdViewList, subLinks: viewsLinks },
  ];

  return (
    <Flex
      align="left"
      justifyContent="space-between"
      w="100%"
      flexDirection="column"
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
            <Collapse in={activeRoute(link.to)} style={{ width: '-webkit-fill-available' }}>
              {activeRoute(link.to) ? (
                <VStack alignItems="start" pt={2}>
                  {link.subLinks.map((subLink) => (
                    <Flex
                      justifyContent="space-between"
                      borderRightColor="white"
                      _hover={{
                        borderRightColor: 'brand.100',
                      }}
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
                                : inactiveColor
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
                                : 'secondaryGray.600'
                            }
                            fontWeight="500"
                            fontSize="md"
                          >
                            {subLink.text}
                          </Text>
                        </Flex>
                      </NavLink>
                      <Button
                        onClick={() => navigate(`${link.to}/${subLink.to}/edit`)}
                        borderRadius={30}
                        borderRightRadius={0}
                        variant="ghost"
                        _hover={{ bg: 'brand.100' }}
                        size="xs"
                      >
                        <Icon as={MdEdit} />
                      </Button>
                    </Flex>
                  ))}
                </VStack>
              ) : undefined}
            </Collapse>
          </>
        </HStack>
      ))}
    </Flex>
  );
}

export default SidebarLinks;
