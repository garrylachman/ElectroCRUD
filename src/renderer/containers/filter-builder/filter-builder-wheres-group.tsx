/* eslint-disable @typescript-eslint/no-unsafe-return */
// @ts-nocheck
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
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { VscGroupByRefType, VscUngroupByRefType } from 'react-icons/vsc';
import { RippleButton } from '@electrocrud/buttons';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';
import { useAppDispatch } from 'renderer/store/hooks';
import { TemporaryFiltersReducer } from 'renderer/store/reducers';

import { FilterBuilderWheres } from './filter-builder-wheres';
import { StrictFilterRO } from 'renderer/defenitions/record-object';
import memoize from 'proxy-memoize';
import { useSelector } from 'react-redux';
import { InlineSpinner } from 'renderer/components/icons';

type FilterBuilderGroupProperties = {
  index?: number;
  filterId: string;
};

export const FilterBuilderWheresGroup: FC<FilterBuilderGroupProperties> = ({
  index = 0,
  filterId,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const [isLoading, setIsLoading] = useState(true);
  const distpatch = useAppDispatch();
  const filterState = useSelector<RootState, StrictFilterRO>(
    useCallback(
      memoize((state: RootState) =>
        TemporaryFiltersReducer.getSelectors().selectById(
          state.temporaryFilters,
          filterId
        )
      ),
      [filterId]
    )
  );
  const childFilersState = useSelector<RootState, StrictFilterRO>(
    useCallback(
      memoize((state: RootState) =>
        TemporaryFiltersReducer.getSelectors()
          .selectAll(state.temporaryFilters)
          .filter((item) => item.parentId === filterId)
      ),
      [filterId]
    )
  );

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, [filterState, childFilersState]);

  return (
    <>
      {filterState?.id && (
        <VStack key={`filter-${filterState.id}`} w="100%">
          <Card
            variant="outline"
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
                      borderColor="primary.300"
                    />
                    <Button
                      colorScheme="primary"
                      bg="primary.200"
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
                      onClick={() => {
                        setIsLoading(true);
                        distpatch(
                          TemporaryFiltersReducer.actions.upsertOne({
                            id: filterState.id,
                            and: !filterState.and,
                            viewId: viewState?.id,
                          })
                        );
                      }}
                    >
                      {filterState.and ? 'AND' : 'OR'}
                    </Button>
                  </Center>
                  <Box display="flex" flexDirection="column" width="100%">
                    <FilterBuilderWheres filterId={filterState?.id} />
                    {childFilersState.map((item) => (
                      <FilterBuilderWheresGroup
                        key={item.id}
                        filterId={item.id}
                        index={index + 1}
                      />
                    ))}
                    {isLoading && <InlineSpinner text="Working..." />}
                  </Box>
                </Box>
              </Box>
            </CardBody>
            <CardFooter justifyContent="flex-end" pt={0}>
              <HStack>
                <RippleButton
                  fontWeight="thin"
                  colorScheme="primary"
                  size="sm"
                  leftIcon={<Icon as={VscGroupByRefType} fontSize="lg" />}
                  onClick={() => {
                    setIsLoading(true);
                    distpatch(
                      TemporaryFiltersReducer.actions.upsertOne(
                        {
                          and: true,
                          parentId: filterState.id,
                          viewId: viewState?.id,
                        },
                        { new: true }
                      )
                    );
                  }}
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
                  onClick={() => {
                    if (filterState?.id) {
                      setIsLoading(true);
                      distpatch(
                        TemporaryFiltersReducer.actions.removeOne(
                          filterState.id
                        )
                      );
                    }
                  }}
                  leftIcon={<Icon as={VscUngroupByRefType} fontSize="lg" />}
                >
                  REMOVE SUB GROUP
                </RippleButton>
              </HStack>
            </CardFooter>
          </Card>
        </VStack>
      )}
    </>
  );
};
