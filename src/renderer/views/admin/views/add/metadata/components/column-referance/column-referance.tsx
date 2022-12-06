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
import * as Joi from 'joi';
import { FC, useContext, useMemo, useState, memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MdArrowForward,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { InlineEditField } from 'renderer/components/fields';
import { EntitiesIndexerContext, ViewScopedContext } from 'renderer/contexts';
import { ColumnReferanceRO } from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReferanceReducer } from 'renderer/store/reducers';
import { useVisibleAnimation } from 'framer-motion-visible';
import { motion } from 'framer-motion';
import { ColumnReferanceColumnComponent } from './column-referance-column';
import { ColumnReferanceViewComponent } from './column-referance-view';

type ColumnReferanceProperties = {
  id: string;
  from: string;
  fromView: string;
  selectedView?: string;
  selectedColumn?: string;
  columnReferanceState?: ColumnReferanceRO;
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
  modificationDate: Joi.optional(),
  creationDate: Joi.optional(),
  id: Joi.optional(),
});

const ColumnReferance: FC<ColumnReferanceProperties> = ({
  columnReferanceState,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const { getById } = useContext(EntitiesIndexerContext);
  const dispatch = useAppDispatch();
  const [selectedView, setSelectedView] = useState(
    columnReferanceState?.toView
  );
  const [selectedColumnState, setSelectedColumnState] = useState(
    columnReferanceState?.to
  );

  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    resolver: joiResolver(validationSchema),
    mode: 'all',
    defaultValues: columnReferanceState,
  });

  const {
    reset,
    formState: { isValid, isDirty },
  } = formContext;

  const onSubmit = (data) => {
    dispatch(ColumnsReferanceReducer.actions.upsertOne(data));
  };

  const [isOpen, { toggle }] = useBoolean(
    columnReferanceState.id === undefined
  );

  return (
    <FormProvider {...formContext}>
      <form style={{ width: '100%' }}>
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
          <Collapse in={isOpen} animateOpacity style={{ overflow: 'initial' }}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <ColumnReferanceViewComponent
                excludeViewId={viewState?.id}
                selectedViewId={selectedView}
                onSelected={(value, name) => {
                  setSelectedView(value);
                }}
              />
              <ScaleFade
                in={selectedView !== undefined}
                initialScale={0.2}
                unmountOnExit
              >
                <ColumnReferanceColumnComponent
                  selectedViewId={selectedView}
                  selectedColumnId={selectedColumnState}
                  onSelected={(value, name) => {
                    setSelectedColumnState(value);
                  }}
                />
              </ScaleFade>
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
                    dispatch(
                      ColumnsReferanceReducer.actions.removeOne(
                        columnReferanceState.id
                      )
                    )
                  }
                >
                  Delete
                </Button>
              </GridItem>
            </Grid>
          </Collapse>
          <Collapse
            in={!isOpen}
            animateOpacity
            style={{ overflow: 'initial', position: 'relative', top: '-2px' }}
          >
            <>
              {useMemo(
                () => (
                  <span style={{ display: 'flex' }}>
                    <Kbd fontSize="md">
                      {getById(columnReferanceState.fromView)}.
                      {getById(columnReferanceState.from)}
                    </Kbd>
                    <Icon as={MdArrowForward} fontSize={20} mx={2} />
                    <Kbd fontSize="md">
                      {getById(columnReferanceState.toView)}.
                      {getById(columnReferanceState.to)}
                    </Kbd>
                  </span>
                ),
                [columnReferanceState]
              )}
            </>
          </Collapse>
        </Box>
      </form>
    </FormProvider>
  );
};

function AnimateComponent({ children }) {
  const visibleAnimation = useVisibleAnimation({
    initial: { x: 0, y: -100, opacity: 0, width: '100%' },
    visible: { x: 0, y: 0, opacity: 1, width: '100%' },
  });

  return <motion.div {...visibleAnimation}>{children}</motion.div>;
}

export const ColumnReferanceComponent = (properties) => (
  <AnimateComponent>
    <ColumnReferance {...properties} />
  </AnimateComponent>
);
