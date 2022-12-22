import {
  Badge,
  Box,
  Card,
  CardBody,
  Collapse,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import memoize from 'proxy-memoize';
import { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import {
  MdCheck,
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { InlineEditField, TagsAutocomplete } from 'renderer/components/fields';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { ViewScopedContext } from 'renderer/contexts';
import {
  ColumnReferanceRO,
  ColumnRO,
  TagType,
} from 'renderer/defenitions/record-object';
import {
  ColumnReferenceSelectors,
  ColumnSelectors,
} from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

import { ColumnReferance } from './column-referance/column-referance';

const TagsLine: FC<{ columnState: ColumnRO }> = ({ columnState }) =>
  useMemo(
    () => (
      <HStack
        py={0}
        shouldWrapChildren
        wrap="wrap"
        spacing={0}
        isInline
        justify="flex-start"
      >
        {[
          'data_type',
          'default_value',
          'foreign_key_column',
          'foreign_key_table',
          'is_nullable',
          'is_primary_key',
          'is_unique',
          'max_length',
          'searchable',
        ].map((key) => (
          <>
            {columnState[key] !== null && columnState[key] !== undefined && (
              <Badge
                variant="subtle"
                colorScheme="brand"
                size="sm"
                m="0"
                mt={2}
                mr={2}
              >
                <Tag variant="subtle" fontSize={7} size="sm" mr={1}>
                  {key}
                </Tag>
                <Tag
                  variant="solid"
                  colorScheme={
                    typeof columnState[key] === 'boolean'
                      ? (columnState[key] === true
                        ? 'green'
                        : 'red')
                      : 'gray'
                  }
                  fontSize={7}
                  size="sm"
                >
                  {typeof columnState[key] === 'boolean' ? (
                    <>
                      {columnState[key] && <Icon boxSize={3} as={MdCheck} />}
                      {!columnState[key] && <Icon boxSize={3} as={MdClose} />}
                    </>
                  ) : (
                    <>{String(columnState[key])}</>
                  )}
                </Tag>
              </Badge>
            )}
          </>
        ))}
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

  const columnState = useSelector((state) =>
    ColumnSelectors.createColumnSelector(state)
  )(columnId);

  const columnReferanceState = useSelector((state) =>
    ColumnReferenceSelectors.createColumnReferanceByFromColumnSelector(state)
  )(columnId);

  const columnReferanceIds = columnReferanceState.map(
    (item) => item?.id
  ) as string[];

  const columnReferanceWithNamesState = useSelector(
    useCallback(
      memoize((state) =>
        ColumnReferenceSelectors.createColumnReferanceWithNames(state)(
          columnReferanceIds
        )
      ),
      [columnReferanceIds]
    )
  );

  useEffect(() => console.log(columnReferanceWithNamesState, columnReferanceIds), [columnReferanceWithNamesState]);

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
    <motion.div
      layout
      initial={{ scaleY: 0.2, position: 'relative', opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1, width: '100%' }}
      exit={{ scaleY: 0.2, opacity: 0 }}
      transition={{ duration: 1, bounce: 0.8, type: 'spring' }}
    >
      <Card pb={5} overflow="unset">
        <CardHeaderBetter isTopBorder={isOpen}>
          <SectionHeader
            title={columnState?.name}
            subTitle={`Last Modification: ${new Date(
              columnState?.modificationDate
            ).toLocaleString()}`}
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
          <CardBody py={0}>
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
              <LayoutGroup>
                {columnReferanceWithNamesState.map((item, index) => (
                  <ColumnReferance
                    key={`ref-${item?.id || index}`}
                    columnReferanceState={item}
                  />
                ))}
              </LayoutGroup>
            </VStack>
          </CardBody>
        </Collapse>
      </Card>
    </motion.div>
  );
};
