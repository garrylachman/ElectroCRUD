import {
  Box,
  Button,
  Collapse,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Kbd,
  ScaleFade,
  useBoolean,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { motion } from 'framer-motion';
import * as Joi from 'joi';
import { FC, useContext, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MdArrowForward,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { InlineEditField } from 'renderer/components/fields';
import {
  ConfirmPromiseDeleteModal,
} from 'renderer/components/modals/confirm-promise-delete-modal';
import { ViewScopedContext } from 'renderer/contexts';
import {
  ColumnReferanceRO,
  demote,
  StrictColumnReferanceRO,
  StrictColumnReferanceWithViewsAndCoumnsRO,
} from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReferanceReducer } from 'renderer/store/reducers';

import { ColumnReferanceColumn } from './column-referance-column';
import { ColumnReferanceView } from './column-referance-view';

type ColumnReferanceProperties = {
  id: string;
  from: string;
  fromView: string;
  selectedView?: string;
  selectedColumn?: string;
  columnReferanceState?:
    | StrictColumnReferanceWithViewsAndCoumnsRO
    | Partial<ColumnReferanceRO>;
};

type FormData = Omit<
  ColumnReferanceRO,
  'id' | 'creationDate' | 'modificationDate'
>;

const validationSchema = Joi.object<FormData>({
  from: Joi.string().min(5).required(),
  fromView: Joi.string().min(5).required(),
  to: Joi.string().min(5).required(),
  toView: Joi.string().min(5).required(),
  description: Joi.optional(),
});

export const ColumnReferance: FC<ColumnReferanceProperties> = ({
  columnReferanceState,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();
  const columnReferanceStateDemoted = useMemo(() => {
    if (!columnReferanceState) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }
    if (!columnReferanceState.id) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return columnReferanceState;
    }
    return demote<
      StrictColumnReferanceWithViewsAndCoumnsRO,
      StrictColumnReferanceRO
    >(columnReferanceState, ['from', 'to', 'fromView', 'toView']);
  }, [columnReferanceState]);

  const [selectedView, setSelectedView] = useState(
    columnReferanceStateDemoted?.toView
  );
  const [selectedColumnState, setSelectedColumnState] = useState(
    columnReferanceStateDemoted?.to
  );

  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    resolver: joiResolver(validationSchema),
    mode: 'all',
    defaultValues: columnReferanceStateDemoted,
  });

  const {
    formState: { isValid, isDirty },
  } = formContext;

  const onSubmit = (data) => {
    dispatch(ColumnsReferanceReducer.actions.upsertOne(data));
  };

  const [isOpen, { toggle }] = useBoolean(
    columnReferanceState?.id === undefined
  );

  return (
    <motion.div
      layout
      initial={{ scale: 0.2, opacity: 0.2 }}
      animate={{ scale: 1, opacity: 1, width: '100%' }}
      exit={{ scale: 0.2, opacity: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ zIndex: 150 }}
    >
      <FormProvider {...formContext}>
        <form>
          <Box
            flexDirection="column"
            w="100%"
            borderLeftWidth={5}
            p={5}
            pt="5px"
            borderLeftRadius="10px"
            borderLeftColor={isDirty && isValid ? 'green' : 'brand'}
          >
            <Box
              alignItems="center"
              justifyContent="space-between"
              position="relative"
              top="-5px"
              right="0px"
              textAlign="right"
            >
              <IconButton
                hidden={columnReferanceState.id === undefined}
                size="xs"
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
            </Box>
            <Collapse in={isOpen} animateOpacity style={{ overflow: 'unset' }}>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <ColumnReferanceView
                  excludeViewId={viewState?.id}
                  selectedViewId={selectedView}
                  onSelected={(value, name) => {
                    setSelectedView(value);
                  }}
                />
                <ColumnReferanceColumn
                  selectedViewId={selectedView}
                  selectedColumnId={selectedColumnState}
                  onSelected={(value, name) => {
                    setSelectedColumnState(value);
                  }}
                />
                <GridItem colSpan={2} py={1}>
                  <ScaleFade
                    in={selectedColumnState !== undefined}
                    initialScale={0.2}
                    unmountOnExit
                  >
                    <Heading size="sm" py={2}>
                      Description
                    </Heading>
                    <InlineEditField
                      id="description"
                      fontSize="md"
                      placeholder="Please describe the releations beween the tables / columns"
                    />
                  </ScaleFade>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    variant="solid"
                    colorScheme="brand"
                    type="button"
                    isDisabled={!isValid}
                    onClick={formContext.handleSubmit(onSubmit)}
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    type="button"
                    hidden={columnReferanceState?.id === undefined}
                    onClick={() =>
                      ConfirmPromiseDeleteModal({
                        entityName: `Referance in ${viewState?.name}`,
                      })
                        .then(() => {
                          if (columnReferanceState) {
                            dispatch(
                              ColumnsReferanceReducer.actions.removeOne(
                                columnReferanceState?.id
                              )
                            );
                          }
                          return true;
                        })
                        .catch(() => {})
                    }
                  >
                    Delete
                  </Button>
                </GridItem>
              </Grid>
            </Collapse>
            <Collapse in={!isOpen} animateOpacity>
              {useMemo(
                () => (
                  <Box>
                    {columnReferanceState?.id && (
                      <>
                        <Kbd fontSize="md">
                          {columnReferanceState?.fromView?.name}.
                          {columnReferanceState?.from?.name}
                        </Kbd>
                        <Icon as={MdArrowForward} fontSize={20} mx={2} />
                        <Kbd fontSize="md">
                          {columnReferanceState?.toView?.name}.
                          {columnReferanceState?.to?.name}
                        </Kbd>
                      </>
                    )}
                  </Box>
                ),
                [columnReferanceState]
              )}
            </Collapse>
          </Box>
        </form>
      </FormProvider>
    </motion.div>
  );
};
