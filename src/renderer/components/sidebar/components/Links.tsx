import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LayoutGroup, motion } from 'framer-motion';
import React, { CSSProperties, useMemo } from 'react';
import { IconType } from 'react-icons';
import { MdHome, MdSettings, MdViewList } from 'react-icons/md';
import { TbArrowRight, TbEdit, TbSquarePlus, TbTable } from 'react-icons/tb';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MotionBox } from 'renderer/components/motions/motion-box';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';
import { O } from 'ts-toolbelt';

type LinkItemType = {
  to: string;
  text: string;
  icon: IconType;
  hr?: boolean;
  hide?: boolean;
  style?: CSSProperties;
};

type TopLevelItemType = O.Merge<LinkItemType, { subLinks: LinkItemType[] }>;

const iconMotion = {
  rest: {
    filter: 'drop-shadow(0 0 0rem #E9E3FF)brightness(1)',
    transition: {
      duration: 2,
      type: 'spring',
    },
  },
  hover: {
    filter: 'drop-shadow(0 0 0.45rem #E9E3FF)brightness(2)',
    transition: {
      duration: 2,
      type: 'spring',
    },
  },
};

const menuItemMotion = {
  rest: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    transition: {
      duration: 0.2,
      type: 'spring',
    },
  },
  hover: {
    backgroundColor: '#2b2e36',
    transition: {
      duration: 0.2,
      type: 'spring',
    },
  },
};

const collapseArrow = {
  close: {
    transform: 'rotate(0deg) scale(0.9)',
    color: '#cfd0d2',
    filter: undefined,
  },
  open: {
    transform: 'rotate(-90deg) scale(1.2)',
    color: 'white',
    filter: 'drop-shadow(0 0 0.45rem #E9E3FF)brightness(2)',
  },
};

export function Links() {
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

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const viewsLinks: LinkItemType[] = [
    { to: 'add', text: 'Manage Views', icon: TbSquarePlus },
    ...sessionViews.map((view) => ({
      to: view.id,
      text: view.name,
      icon: TbTable,
    })),
  ];

  const links: TopLevelItemType[] = [
    {
      to: 'settings',
      text: 'Settings',
      icon: MdSettings,
      subLinks: [],
      hr: false,
    },
    { to: 'accounts', text: 'Accounts', icon: MdHome, subLinks: [], hr: false },
    {
      to: 'views',
      text: 'Views',
      icon: MdViewList,
      subLinks: viewsLinks,
      style: { height: '-webkit-fill-available' },
      hr: true,
      hide: !sessionState.isConnected,
    },
  ];

  return (
    <Flex w="100%" flexDirection="column" as={MotionBox} overflow="hidden">
      {links
        .filter((link) => !link.hide)
        .map((link) => (
          <React.Fragment key={link.to}>
            {link.hr && (
              <Divider
                borderColor="whiteAlpha.400"
                my={3}
                w="85%"
                alignSelf="center"
              />
            )}
            <HStack sx={link?.style} display="block" zIndex={1}>
              <>
                <NavLink to={link.to}>
                  <Flex
                    as={motion.div}
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    py={2}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={menuItemMotion}
                    sx={{
                      transition: '0.5s',
                      transitionTimingFunction: 'ease-in-out',
                      backgroundColor: activeRoute(link.to)
                        ? '#42454c !important'
                        : undefined,
                    }}
                    pr={link.subLinks.length > 0 ? 10 : 0}
                  >
                    <Box
                      color={activeRoute(link.to) ? 'white' : '#cfd0d2'}
                      me="12px"
                      display="inline-flex"
                      as={motion.div}
                      variants={iconMotion}
                      style={{
                        transition: '1s',
                        transitionTimingFunction: 'ease-in-out',
                      }}
                      filter={
                        activeRoute(link.to)
                          ? iconMotion.hover.filter
                          : undefined
                      }
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
                      color={activeRoute(link.to) ? 'white' : '#cfd0d2'}
                      fontWeight="500"
                      fontSize="14"
                    >
                      {link.text}
                    </Text>
                    {link.subLinks.length > 0 && (
                      <Icon
                        as={TbArrowRight}
                        color="white"
                        sx={{
                          transition: '0.4s',
                          transitionTimingFunction: 'ease-out',
                        }}
                        style={
                          activeRoute(link.to)
                            ? collapseArrow.open
                            : collapseArrow.close
                        }
                      />
                    )}
                  </Flex>
                </NavLink>
                <Box
                  as={Collapse}
                  in={activeRoute(link.to)}
                  marginInlineStart="0px !important"
                >
                  <Flex
                    bgColor={
                      activeRoute(link.to) && link.to === 'views'
                        ? '#1f222b'
                        : undefined
                    }
                    height="-webkit-fill-available"
                    overscrollBehavior="contain"
                    position="absolute"
                    flexDirection="column"
                    width="285px"
                    className={
                      activeRoute(link.to) && link.to === 'views'
                        ? 'custom-scroll'
                        : ''
                    }
                    overflow={
                      activeRoute(link.to) && link.to === 'views'
                        ? 'scroll'
                        : 'hidden'
                    }
                  >
                    {activeRoute(link.to) && link.subLinks.length > 0 ? (
                      <LayoutGroup>
                        <VStack color="secondaryGray.600">
                          {link.subLinks.map((subLink, subLinksIndex) => (
                            <motion.div
                              key={subLink.to}
                              style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '0px',
                              }}
                              initial={{
                                x: -50,
                                position: 'relative',
                                opacity: 0,
                              }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -20, opacity: 0 }}
                              transition={{
                                duration: 0.5,
                                bounce: 0.7,
                                type: 'spring',
                                delay: subLinksIndex * 0.1,
                                ease: 'easeOut',
                              }}
                            >
                              <Flex
                                as={motion.div}
                                justifyContent="space-between"
                                alignItems="center"
                                cursor="pointer"
                                w="auto"
                                initial="rest"
                                animate="rest"
                                whileHover="hover"
                                variants={menuItemMotion}
                                px={5}
                                py={2}
                                sx={{
                                  transition: '0.5s',
                                  transitionTimingFunction: 'ease-in-out',
                                  backgroundColor: activeRoute(
                                    `${link.to}/${subLink.to}`
                                  )
                                    ? '#42454c !important'
                                    : undefined,
                                }}
                              >
                                <NavLink
                                  to={`${link.to}/${subLink.to}`}
                                  key={`${link.to}/${subLink.to}`}
                                  style={{
                                    width: '-webkit-fill-available',
                                    paddingLeft: 20,
                                  }}
                                >
                                  <Flex
                                    w="auto"
                                    gap={3}
                                    justifyContent="space-between"
                                    width="160px"
                                  >
                                    <Box
                                      color={
                                        activeRoute(`${link.to}/${subLink.to}`)
                                          ? 'white'
                                          : '#cfd0d2'
                                      }
                                      display="inline-flex"
                                      alignItems="center"
                                      as={motion.div}
                                      variants={iconMotion}
                                      style={{
                                        transition: '1s',
                                        transitionTimingFunction: 'ease-in-out',
                                      }}
                                      filter={
                                        activeRoute(`${link.to}/${subLink.to}`)
                                          ? iconMotion.hover.filter
                                          : undefined
                                      }
                                    >
                                      <Icon
                                        as={subLink.icon}
                                        width="18px"
                                        height="18px"
                                        color="inherit"
                                      />
                                    </Box>
                                    <Text
                                      me="auto"
                                      color={
                                        activeRoute(`${link.to}/${subLink.to}`)
                                          ? 'white'
                                          : '#cfd0d2'
                                      }
                                      fontWeight={
                                        activeRoute(`${link.to}/${subLink.to}`)
                                          ? 'bold'
                                          : '100'
                                      }
                                      fontSize="13"
                                      whiteSpace="nowrap"
                                      textOverflow="ellipsis"
                                      overflow="hidden"
                                    >
                                      {subLink.text}
                                    </Text>
                                  </Flex>
                                </NavLink>
                                {subLink.to !== 'add' && (
                                  <Button
                                    onClick={() =>
                                      navigate(`${link.to}/${subLink.to}/edit`)
                                    }
                                    variant="ghost"
                                    size="xs"
                                  >
                                    <Icon
                                      as={TbEdit}
                                      width="18px"
                                      height="18px"
                                    />
                                  </Button>
                                )}
                              </Flex>
                            </motion.div>
                          ))}
                        </VStack>
                      </LayoutGroup>
                    ) : undefined}
                  </Flex>
                </Box>
              </>
            </HStack>
          </React.Fragment>
        ))}
    </Flex>
  );
}
