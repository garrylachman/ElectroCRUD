import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Switch,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import * as R from 'ramda';
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MdModeEdit } from 'react-icons/md';
import { DeleteButton } from 'renderer/components/buttons';
import { CancelButton } from 'renderer/components/buttons/cancel-button';
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import { SaveButton } from 'renderer/components/buttons/save-button';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';

import { ElementTypes } from '../elements';
import { ConfigInput } from './config-input';
import { ConfigSelect } from './config-select';
import { ConfigSwitch } from './config-switch';
import { ToolboxConfig } from './toolbox-config';

export type EditPopoverProperties = {
  item: ElementTypes;
  onUpdate: (item: ElementTypes) => void;
  onDelete: () => void;
};

export const EditPopover: FC<PropsWithChildren<EditPopoverProperties>> = ({
  item,
  onUpdate,
  onDelete,
  children,
}) => {
  const [state, setState] = useState(item.properties);
  const [isEditing, setIsEditing] = useBoolean();
  const { viewState } = useContext(ViewScopedContext);
  const columnList = useMemo(
    () => viewState?.columns.map((c) => c.name),
    [viewState?.columns]
  );

  const config = useMemo(
    () => ToolboxConfig[item.type] || undefined,
    [ToolboxConfig, item.type]
  );

  useEffect(() => console.log(state), [state]);

  const handleUpdate = () => {
    onUpdate(state);
    setIsEditing.off();
  };

  const handleDelete = () => {
    onDelete();
    setIsEditing.off();
  };

  return (
    <>
      <Popover
        isOpen={isEditing}
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}
        placement="auto"
        isLazy
        lazyBehavior="unmount"
        strategy="absolute"
      >
        <PopoverTrigger>
          <Box display="flex" gap={3} alignItems="center">
            <RippleButton
              size="sm"
              p={0}
              bgColorScheme="secondaryGray"
              color="black"
            >
              <Icon as={MdModeEdit} boxSize={4} />
            </RippleButton>
          </Box>
        </PopoverTrigger>
        <PopoverAnchor>{children}</PopoverAnchor>
        <PopoverContent boxShadow="xl" rounded="xl">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <SimpleGrid>
              {Object.keys(config).map((secItem) => (
                <GridItem my={2}>
                  <Flex fontWeight="semibold" textTransform="capitalize">{secItem}</Flex>
                  {config[secItem].map((configItem) => (
                    <Flex
                      justifyContent="space-between"
                      gap={3}
                      alignItems="center"
                      my={1}
                      fontSize="sm"
                    >
                      <Text flex={1} textTransform="capitalize">{configItem.label}</Text>
                      {configItem.type === 'bool' && (
                        <ConfigSwitch
                          section={secItem}
                          field={configItem.field}
                          value={R.path(
                            [secItem, configItem.field],
                            state
                          )}
                          onUpdate={
                            (value) => setState(
                              (prev) => R.set(R.lensPath([secItem, configItem.field]), value, prev)
                            )
                          }
                        />
                      )}
                      {configItem.type === 'text' && (
                        <ConfigInput
                          section={secItem}
                          field={configItem.field}
                          value={R.path(
                            [secItem, configItem.field],
                            state
                          )}
                          onUpdate={
                            (value) => setState(
                              (prev) => R.set(R.lensPath([secItem, configItem.field]), value, prev)
                            )
                          }
                        />
                      )}
                      {R.is(Array, configItem.type) && (
                        <ConfigSelect
                          options={configItem.type}
                          section={secItem}
                          field={configItem.field}
                          value={R.path(
                            [secItem, configItem.field],
                            state
                          )}
                          onUpdate={
                            (value) => setState(
                              (prev) => R.set(R.lensPath([secItem, configItem.field]), value, prev)
                            )
                          }
                        />
                      )}
                      {configItem.type === 'column' && (
                        <ConfigSelect
                          options={columnList}
                          section={secItem}
                          field={configItem.field}
                          value={R.path(
                            [secItem, configItem.field],
                            state
                          )}
                          onUpdate={
                            (value) => setState(
                              (prev) => R.set(R.lensPath([secItem, configItem.field]), value, prev)
                            )
                          }
                        />
                      )}
                    </Flex>
                  ))}
                </GridItem>
              ))}
            </SimpleGrid>
          </PopoverBody>
          <PopoverFooter justifyContent="end" display="flex">
            <Flex gap={3}>
              <DeleteButton size="sm" onClick={handleDelete} />
              <CancelButton size="sm" onClick={setIsEditing.off} />
              <SaveButton size="sm" onClick={handleUpdate} />
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};
