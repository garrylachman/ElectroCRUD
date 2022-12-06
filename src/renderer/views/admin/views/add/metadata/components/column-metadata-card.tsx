import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Collapse,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { FC, useContext, useMemo } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { InlineEditField, TagsAutocomplete } from 'renderer/components/fields';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { ViewScopedContext } from 'renderer/contexts';
import {
  ColumnReferanceRO,
  ColumnRO,
  TagType,
} from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import {
  ColumnReferenceSelectors,
  ColumnSelectors,
} from 'renderer/store/selectors';
import { ColumnReferanceComponent } from './column-referance/column-referance';

const TagsLine: FC<{ columnState: ColumnRO }> = ({ columnState }) =>
  useMemo(
    () => (
      <HStack py={0}>
        {['key', 'type', 'nullable', 'length', 'enabled', 'searchable'].map(
          (key) => (
            <>
              {columnState[key] !== null && columnState[key] !== undefined && (
                <Badge variant="subtle" colorScheme="brand" mr={2} size="sm">
                  <Tag variant="subtle" mr={2} fontSize={10} size="sm">
                    {key}
                  </Tag>
                  <Tag
                    variant="solid"
                    colorScheme={columnState[key] === true ? 'green' : 'gray'}
                    fontSize={10}
                    size="sm"
                  >
                    {String(columnState[key])}
                  </Tag>
                </Badge>
              )}
            </>
          )
        )}
      </HStack>
    ),
    [columnState]
  );

type ColumnMetadataCardProperties = {
  fieldIndex: number;
  columnId: string;
};

export const ColumnMetadataCard: FC<ColumnMetadataCardProperties> = ({
  columnId,
  fieldIndex,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();

  const columnState = useSelector((state) =>
    ColumnSelectors.createColumnSelector(state)
  )(columnId);

  const columnReferanceState = useSelector((state) =>
    ColumnReferenceSelectors.createColumnReferanceByFromColumnSelector(state)
  )(columnId);

  const columnReferance = useMemo(() => {
    return [
      ...columnReferanceState,
      {
        from: columnId,
        fromView: viewState.id,
      } as ColumnReferanceRO,
    ];
  }, [columnReferanceState, viewState, columnId]);

  const [isOpen, { on, off, toggle }] = useBoolean();

  return (
    <Card>
      <CardHeaderBetter isTopBorder={isOpen}>
        <SectionHeader
          title={columnState.name}
          subTitle={`Last Modification: ${new Date(columnState?.modificationDate).toLocaleString()}`}
          RightComponent={() => (
              <IconButton
              size="sm"
              aria-label="Open / Close"
              colorScheme="brand"
              variant={isOpen ? 'outline' : 'solid'}
              icon={
                isOpen ? (
                  <MdKeyboardArrowUp size={20} />
                ) : (
                  <MdKeyboardArrowDown size={20} />
                )
              }
              onClick={toggle}
            />
          )}
        />
        <TagsLine columnState={columnState} />
      </CardHeaderBetter>
      <Collapse in={isOpen} animateOpacity style={{ overflow: 'initial' }}>
        <CardBody pt={0}>
          <Divider pb={1} />
          <VStack w="100%" py={5} alignItems="flex-start">
            <Box py={2}>
              <Heading size="md">Title</Heading>
            </Box>
            <InlineEditField
              id={`metadata[${fieldIndex}].title`}
              fontSize="xl"
              placeholder="Title (or Name)"
            />
            <Box py={5}>
              <Heading size="md">Description</Heading>
            </Box>
            <InlineEditField
              id={`metadata[${fieldIndex}].description`}
              type="textarea"
              placeholder="Description"
            />
            <Divider pt={6} />
            <Box py={5}>
              <Heading size="md">Columns Tags</Heading>
              <Text>
                you can tag your columns for documantions, apply policies &
                searching.
              </Text>
            </Box>
            <TagsAutocomplete
              id={`metadata[${fieldIndex}].tags`}
              type={TagType.COLUMN}
              target={{ columnId: columnState.id }}
              defaultValue={[...columnState.metadata.tags]}
            />
            <Divider pt={10} />
            <Box py={5}>
              <Heading size="md">Referances</Heading>
              <Text>relations between views/volumns</Text>
            </Box>
            {columnReferance.map((item, index) => (
              <ColumnReferanceComponent
                key={`ref-${index}`}
                columnReferanceState={item}
              />
            ))}
          </VStack>
        </CardBody>
      </Collapse>
    </Card>
  );
};
