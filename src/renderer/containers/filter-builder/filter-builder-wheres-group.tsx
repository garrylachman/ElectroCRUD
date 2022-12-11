import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  HStack,
  Icon,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { VscGroupByRefType, VscUngroupByRefType } from 'react-icons/vsc';
import { RippleButton } from 'renderer/components/buttons/ripple-button';

import { FilterBuilderWheresGroupCondProperties } from './filter-builder-where';
import { FilterBuilderWheres } from './filter-builder-wheres';

export type FilterBuilderWheresGroupProperties = {
  index?: number;
  and: boolean;
  conds: FilterBuilderWheresGroupCondProperties[];
  groups: FilterBuilderWheresGroupProperties[];
};

export const FilterBuilderWheresGroup: FC<
  FilterBuilderWheresGroupProperties
> = ({ index = 0, conds, groups, and }) => {
  const [groupsState, setGroupsState] =
    useState<FilterBuilderWheresGroupProperties[]>(groups);
  const [andState, {toggle}] = useBoolean(and);

  return (
    <>
      <VStack key={`filter-${index}`} w="100%">
        <Card
          variant="solid"
          boxShadow="sm"
          borderWidth={1}
          mt={index === 0 ? 0 : 3}
          bg={index % 2 === 0 ? 'white' : 'gray.100'}
          overflow="initial"
        >
          <CardBody overflow="initial">
            <Box display="flex" flexDirection="row">
              <Box width="100%" flexDirection="row" display="flex">
                <Center
                  height="auto"
                  flexDirection="column"
                  display="flex"
                  px={6}
                  pl={3}
                >
                  <Divider
                    orientation="vertical"
                    width="15px"
                    borderWidth="2px"
                    borderRightWidth={0}
                    borderTopLeftRadius="5px"
                    borderBottomLeftRadius="5px"
                    borderColor="brand.300"
                  />
                  <Button
                    colorScheme="brand"
                    bg="brand.200"
                    variant="solid"
                    size="xs"
                    position="absolute"
                    fontSize="xx-small"
                    left="15px"
                    width="27px"
                    height="27px"
                    borderRadius="30px"
                    fontWeight="normal"
                    _hover={{
                      transform: 'scale(1.3)',
                    }}
                    onClick={toggle}
                  >
                    {andState ? 'AND' : 'OR'}
                  </Button>
                </Center>
                <Box display="flex" flexDirection="column" width="100%">
                  <FilterBuilderWheres conds={conds} />
                  {groupsState.map((item) => (
                    <FilterBuilderWheresGroup
                      conds={item.conds}
                      groups={item.groups}
                      index={index + 1}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </CardBody>
          <CardFooter justifyContent="flex-end" pt={0}>
            <HStack>
              <RippleButton
                fontWeight="thin"
                colorScheme="brand"
                size="sm"
                leftIcon={<Icon as={VscGroupByRefType} fontSize="lg" />}
                onClick={() =>
                  setGroupsState((previous) => [
                    ...previous,
                    {
                      conds: [
                        { column: undefined, opr: undefined, value: undefined },
                      ],
                      groups: [],
                    },
                  ])
                }
              >
                ADD SUB GROUP
              </RippleButton>
              <RippleButton
                fontWeight="thin"
                colorScheme="red"
                size="sm"
                bgColor={{
                  step1: 'red.400',
                  step2: 'red.600',
                  step3: 'red.100',
                }}
                leftIcon={<Icon as={VscUngroupByRefType} fontSize="lg" />}
              >
                REMOVE SUB GROUP
              </RippleButton>
            </HStack>
          </CardFooter>
        </Card>
      </VStack>
    </>
  );
};

/*
            <CardFooter justifyContent="flex-end" pt={0}>
              <HStack>
                <Button
                  fontWeight="thin"
                  colorScheme="brand"
                  size="sm"
                  leftIcon={<Icon as={VscGroupByRefType} fontSize="lg" />}
                  onClick={() => append()}
                >
                  ADD SUB GROUP
                </Button>
                <Button
                  fontWeight="thin"
                  colorScheme="red"
                  size="sm"
                  leftIcon={<Icon as={VscUngroupByRefType} fontSize="lg" />}
                >
                  REMOVE SUB GROUP
                </Button>
              </HStack>
            </CardFooter>
            */
/*

 {field.groups.map((groupItem) => (
                    <FilterBuilderWheresGroup
                      key={`filter-${index_}`}
                      nestedName={`filters[${i}]`}
                      index={index + 1}
                    />
                  ))}
                  */
