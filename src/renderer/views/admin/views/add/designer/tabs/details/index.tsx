import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
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
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import { SaveButton } from 'renderer/components/buttons/save-button';
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
          (a, b) => a.order - b.order
        )
      );
    }
  }, [viewDetailsState]);

  const handleSave = () => {
    dispatch(
      ViewDetailsReducer.actions.upsertOne({
        ...(viewDetailsState || { viewId: viewState.id }),
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
      <Card>
        <CardHeader>Details Page Desinger</CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(5, 1fr)" gap={10}>
            <GridItem colSpan={4}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="droppable"
                  disableInteractiveElementBlocking={false}
                >
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {state.map((item, index) => (
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
                                    <Tooltip
                                      bgColor="brand.600"
                                      label="Drag to re-order"
                                      rounded={8}
                                    >
                                      <IconButton
                                        size="sm"
                                        icon={<Icon as={MdDragIndicator} />}
                                        variant="ghost"
                                        {...provided.dragHandleProps}
                                      />
                                    </Tooltip>
                                    <EditPopover
                                      key={`ep-${index}`}
                                      item={item}
                                      onDelete={() =>
                                        setState((previous) =>
                                          previous.filter(
                                            (value) => value.id !== item.id
                                          )
                                        )
                                      }
                                      onUpdate={(value) =>
                                        setState((previous) =>
                                          R.update(
                                            index,
                                            {
                                              ...previous[index],
                                              properties: value,
                                            },
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
                                  <RenderElement item={item} row={data} />
                                )}
                              </Flex>
                            </div>
                          )}
                        </Draggable>
                      ))}
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
        </CardBody>
      </Card>
    </>
  );
};
