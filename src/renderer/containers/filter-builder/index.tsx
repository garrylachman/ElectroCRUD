import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Input,
  Text,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';
import { useAppDispatch } from 'renderer/store/hooks';
import {
  TemporaryFiltersReducer,
  ViewFiltersReducer,
} from 'renderer/store/reducers';
import {
  createFiltersSelector,
  FiltersTree,
} from 'renderer/store/selectors/filters.selectors';
import { RootState } from 'renderer/store/store';

import { FilterBuilderWheresGroup } from './filter-builder-wheres-group';

type FilterBuilderProperties = {
  id?: string;
  setFilter: (name: string, value: string, close?: boolean) => void;
};

export const FilterBuilder: FC<FilterBuilderProperties> = ({
  id,
  setFilter,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const distpatch = useAppDispatch();
  const [filterId, setFilterId] = useState(id);
  const [filterName, setFilterName] = useState<string>('');
  const [showInfoAlert, setShowInfoAlert] = useState<boolean>(true);
  const reference = useRef();
  useOutsideClick({
    ref: reference,
    handler: () => setShowInfoAlert(false),
  });

  const filtersState = useSelector<RootState, FiltersTree>(
    useCallback(
      memoize((state) => createFiltersSelector(state)(filterId)),
      [filterId]
    )
  );

  useEffect(() => {
    if (filtersState) {
      // console.log(filtersToKnex(filtersState));
      setFilter('Unsaved Filter', filtersState);
    }
  }, [filtersState]);

  const filterSaveHandle = () => {
    const newFilter = distpatch(
      ViewFiltersReducer.actions.upsertOne({
        name: filterName,
        viewId: viewState?.id,
        knexFilter: R.toString(filtersState),
      })
    );
    if (newFilter && newFilter.payload.knexFilter) {
      setFilterId();
      setFilter(filterName, JSON.parse(newFilter.payload.knexFilter), true);
    }
  };

  useState(() => {
    const result = distpatch(
      TemporaryFiltersReducer.actions.upsertOne(
        { and: true, viewId: viewState?.id },
        { new: true }
      )
    );
    if (result.payload.id) {
      setFilterId(result.payload.id);
    }
    setShowInfoAlert(true);
  }, []);

  return (
    <>
      {filterId && (
        <VStack alignItems="flex-start" w="100%">
          <Card variant="elevated" overflow="unset">
            <CardHeader>
              <Text fontWeight="bold" fontSize="xl">
                Filter where's
              </Text>
            </CardHeader>
            <CardBody overflow="scroll">
              <Alert
                status="info"
                variant="left-accent"
                shadow="md"
                rounded="lg"
                hidden={!showInfoAlert}
                mb={3}
              >
                <AlertIcon p={0} mr={5} ml={2} />
                <Box py={0}>
                  <AlertTitle>Save Filter</AlertTitle>
                  <AlertDescription>
                    The filter is been applyed real-time but its must been saved
                    for future. The save component is in filter card fotter.
                  </AlertDescription>
                </Box>
              </Alert>
              <Box height="220px">
                {filterId && <FilterBuilderWheresGroup filterId={filterId} />}
              </Box>
            </CardBody>
            <CardFooter>
              <HStack alignItems="center" flex={1} maxWidth="60%" gap={5}>
                <Text>Save Filter as</Text>
                <Input
                  type="text"
                  placeholder="Filter Name"
                  variant="flushed"
                  flex={1}
                  style={{ marginLeft: '1.8rem', marginRight: '1.8rem' }}
                  onChange={(e) => setFilterName(e.target.value)}
                />
                <Button
                  variant="solid"
                  colorScheme="primary"
                  onClick={filterSaveHandle}
                >
                  Save Filter
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => setFilter(undefined, undefined, true)}
                >
                  Close
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        </VStack>
      )}
    </>
  );
};
