import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Grid,
  Textarea,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { joiResolver } from '@hookform/resolvers/joi';
import { EntityState } from '@reduxjs/toolkit';
import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import Joi from 'joi';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { FC, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { create, InstanceProps } from 'react-modal-promise';
import { useSelector } from 'react-redux';
import { CancelButton, SaveButton } from '@electrocrud/buttons';
import { MotionBox } from 'renderer/components/motions/motion-box';
import { ColumnReferanceRO } from 'renderer/defenitions/record-object';
import { ColumnsReferanceReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { RelationsColumn } from './relations-column';
import { RelationsView } from './relations-view';

const flip = {
  hidden: {
    transform: 'translateZ(150px) translateX(-10px) rotateY(90deg)',
    transformOrigin: '50% 100%',
    opacity: 0,
  },
  visible: {
    transform: 'translateZ(0px) translateX(0%) rotateY(0deg)',
    transformOrigin: '50% 100%',
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
  exit: {
    transform: 'translateZ(-500px) translateX(20px) rotateY(90deg)',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export type RelationsModalProperties = {
  columnRelationId?: string;
  fromViewId?: string;
  from?: string;
} & InstanceProps<unknown>;

const validationSchema = Joi.object({
  id: Joi.optional(),
  from: Joi.string().required(),
  fromView: Joi.string().required(),
  to: Joi.string().required(),
  toView: Joi.string().required(),
  description: Joi.optional(),
});

export const RelationsModalComponent: FC<RelationsModalProperties> = ({
  columnRelationId,
  fromViewId,
  from,
  onResolve,
  onReject,
  isOpen,
}) => {
  const cancelReference = useRef<FocusableElement>(null);

  const formContext = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: joiResolver(validationSchema),
    defaultValues: {
      fromView: fromViewId,
      from,
      description: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  const cancel = () => onReject();
  const onSubmit = (data) => onResolve(data);

  const columnReferanceState = useSelector<
    RootState,
    EntityState<ColumnReferanceRO>
  >((state: RootState) =>
    memoize((state_: RootState) => state_.columnReferance)(state)
  );

  useEffect(() => {
    const data = ColumnsReferanceReducer.getSelectors().selectById(
      // @ts-ignore
      columnReferanceState,
      columnRelationId
    );
    if (data) {
      formContext.reset(
        R.pickAll(
          ['from', 'fromView', 'to', 'toView', 'description', 'id'],
          data
        )
      );
    }
  }, [columnRelationId, columnReferanceState]);

  // @ts-ignore
  const toView = formContext.watch('toView');

  return (
    <AnimatePresence mode="wait">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelReference}
        preserveScrollBarGap
        size="3xl"
        onClose={cancel}
        key="relations-modal"
      >
        <AlertDialogOverlay>
          <motion.div
            onClick={(event) => event.stopPropagation()}
            variants={flip}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AlertDialogContent
              overflow="unset"
              rounded={10}
              shadow="sm"
              as={MotionBox}
              _hover={{ shadow: 'xl' }}
            >
              <AnimatePresence>
                <motion.div
                  animate={{
                    background: [
                      `linear-gradient(60deg, #7434db 0%, ${chroma('#7434db')
                        .brighten(0.1)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, #7434db 0%, ${chroma('#7434db')
                        .brighten(1)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, ${chroma('#7434db')
                        .brighten(1.2)
                        .hex()} 0%, #7434db 100%)`,
                      `linear-gradient(60deg, ${chroma('#7434db')
                        .brighten(0)
                        .hex()} 0%, #7434db 100%)`,
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  style={{
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                  }}
                >
                  <AlertDialogHeader
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                    py={3}
                    borderTopRadius="lg"
                  >
                    Add / Edit Relation
                  </AlertDialogHeader>
                </motion.div>
              </AnimatePresence>

              <AlertDialogBody py={4} minHeight="120px">
                <FormProvider {...formContext}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                      <RelationsView excludeViewId={fromViewId} />
                      {toView && <RelationsColumn />}
                    </Grid>
                    <FormControl pt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        {...register('description')}
                        variant="flushed"
                      />
                    </FormControl>
                  </form>
                </FormProvider>
              </AlertDialogBody>

              <AlertDialogFooter py={4} pt={2} gap={3}>
                <CancelButton onClick={cancel} />
                <SaveButton
                  onClick={handleSubmit(onSubmit)}
                  isDisabled={!isValid}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </motion.div>
        </AlertDialogOverlay>
      </AlertDialog>
    </AnimatePresence>
  );
};

export const RelationsModal = create(RelationsModalComponent);
