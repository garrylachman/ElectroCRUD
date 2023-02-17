import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Tooltip } from '@electrocrud/feedback';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  MdBrokenImage,
  MdDragIndicator,
  MdImage,
  MdTextFields,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RippleButton, SaveButton } from '@electrocrud/buttons';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';
import { useAppDispatch } from 'renderer/store/hooks';
import { ViewDetailsReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { ElementTypes, RenderElement } from './elements';
import { getNewBoolElement } from './elements/bool-element';
import { getNewImageElement } from './elements/image-element';
import { getNewStaticTextElement } from './elements/static-text-element';
import { getNewTextElement } from './elements/text-element';
import { EditPopover } from './toolbox/edit-popover';

const menu = [
  { label: 'Text', icon: MdTextFields, getNew: getNewTextElement },
  { label: 'Static Text', icon: MdTextFields, getNew: getNewStaticTextElement },
  { label: 'Boolean', icon: MdBrokenImage, getNew: getNewBoolElement },
  { label: 'Image', icon: MdImage, getNew: getNewImageElement },
];

const reorder = (
  list: ElementTypes[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export type DesignerDetailsProperties = {
  data?: Record<string, any>;
  readOnly?: boolean;
};

export const DesignerDetails: FC<DesignerDetailsProperties> = ({
  data,
  readOnly = false,
}) => {
  const [state, setState] = useState<ElementTypes[]>([]);
  const dispatch = useAppDispatch();
  const { viewState } = useContext(ViewScopedContext);
  const viewDetailsStore = useSelector((rootState: RootState) =>
    memoize((_state: RootState) => _state.viewDetails)(rootState)
  );
  const viewDetailsState = useMemo(() => {
    return viewDetailsStore
      ? ViewDetailsReducer.getSelectors()
          .selectAll(viewDetailsStore)
          .find((row) => row.viewId === viewState?.id)
      : undefined;
  }, [viewDetailsStore, viewState?.id]);

  useEffect(() => {
    if (viewDetailsState) {
      setState(
        [...(viewDetailsState.properties as ElementTypes[])].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        )
      );
    }
  }, [viewDetailsState]);

  const handleSave = () => {
    dispatch(
      // @ts-ignore
      ViewDetailsReducer.actions.upsertOne({
        ...(viewDetailsState || { viewId: viewState?.id }),
        properties: state,
      })
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(state, result.source.index, result.destination.index);

    setState(items.map((item, index) => ({ ...item, order: index })));
  };

  return (
    <>
      {!readOnly && <Heading>Details Page Desinger</Heading>}
      <Grid templateColumns="repeat(5, 1fr)" gap={10}>
        <GridItem colSpan={readOnly ? 5 : 4}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="droppable"
              disableInteractiveElementBlocking={false}
            >
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    {state.map((item, index) => (
                      <GridItem
                        colSpan={item.properties?.grid?.colSpan}
                        borderBottomWidth={
                          item.properties?.grid?.borderBottomWidth
                        }
                        borderBottomStyle={
                          item.properties?.grid?.borderBottomStyle
                        }
                      >
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Flex gap={2} alignItems="center">
                                {!readOnly && (
                                  <>
                                    <Tooltip label="Drag to re-order">
                                      <IconButton
                                        size="sm"
                                        icon={<Icon as={MdDragIndicator} />}
                                        variant="ghost"
                                        {...provided.dragHandleProps}
                                      />
                                    </Tooltip>
                                    <EditPopover
                                      key={`ep-${item.id}`}
                                      item={item}
                                      onDelete={() =>
                                        setState((previous) =>
                                          previous.filter(
                                            (value) => value.id !== item.id
                                          )
                                        )
                                      }
                                      onUpdate={(value) =>
                                        setState(
                                          // @ts-ignore
                                          (previous: ElementTypes[]) =>
                                            R.update(
                                              index,
                                              {
                                                ...previous[index],
                                                properties: value,
                                              },
                                              // @ts-ignore
                                              previous
                                            )
                                        )
                                      }
                                    >
                                      <RenderElement
                                        item={item}
                                        row={{
                                          Name: 'https://bit.ly/dan-abramov',
                                        }}
                                      />
                                    </EditPopover>
                                  </>
                                )}
                                {readOnly && (
                                  // @ts-ignore
                                  <RenderElement item={item} row={data} />
                                )}
                              </Flex>
                            </div>
                          )}
                        </Draggable>
                      </GridItem>
                    ))}
                  </Grid>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </GridItem>
        {!readOnly && (
          <GridItem>
            <VStack
              alignItems="end"
              boxShadow="lg"
              borderWidth={1}
              rounded={15}
              p={5}
            >
              <SaveButton size="lg" width="100%" onClick={handleSave} />
              <Box width="100%" py={3}>
                <Divider />
              </Box>
              {menu.map((item) => (
                <RippleButton
                  gap={2}
                  w="100%"
                  onClick={() =>
                    setState((previous) => [...previous, item.getNew()])
                  }
                >
                  <Icon as={item.icon} boxSize={4} />
                  <Text>{item.label}</Text>
                </RippleButton>
              ))}
            </VStack>
          </GridItem>
        )}
      </Grid>
    </>
  );
};
