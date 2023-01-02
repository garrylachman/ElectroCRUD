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
  GridItem,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { joiResolver } from '@hookform/resolvers/joi';
import { EntityState } from '@reduxjs/toolkit';
import chroma from 'chroma-js';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Joi from 'joi';
import _ from 'lodash';
import memoize from 'proxy-memoize';
import * as R from 'ramda';
import { FC, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { create, InstanceProps } from 'react-modal-promise';
import { useSelector } from 'react-redux';
import { CancelButton } from 'renderer/components/buttons/cancel-button';
import { SaveButton } from 'renderer/components/buttons/save-button';
import { TagsAutocomplete } from 'renderer/components/fields';
import { MotionBox } from 'renderer/components/motions/motion-box';
import {
  ColumnReferanceRO,
  PolicyRuleTemplates,
  PolicyType,
  TagType,
} from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import {
  ColumnsReferanceReducer,
  PoliciesReducer,
} from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { PolicyFactory } from './policy-factory';

export type PolicyModalProperties = {
  policyId?: string;
} & InstanceProps<unknown>;

const validationSchema = Joi.object({
  id: Joi.optional(),
  name: Joi.string().required(),
  type: Joi.required(),
  tags: Joi.array().optional(),
  payload: Joi.object().optional(),
});

type FormData = {
  id?: string;
  name: string;
  type: PolicyType;
  tags: string[];
  payload: Record<string, any>;
};

const PolicyModalComponent: FC<PolicyModalProperties> = ({
  policyId,
  onResolve,
  onReject,
  isOpen,
}) => {
  const cancelReference = useRef<FocusableElement>(null);

  const policyState = useAppSelector((state) =>
    PoliciesReducer.getSelectors().selectById(state.policies, policyId)
  );

  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: joiResolver(validationSchema),
    defaultValues: _.pick(policyState, [
      'name',
      'type',
      'tags',
      'id',
      'payload',
    ]) || {
      tags: [],
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = formContext;

  const watchType = watch('type');

  const cancel = () => onReject();
  const onSubmit = (data) => onResolve({ ...data, type: Number(data.type) });

  return (
    <AnimatePresence mode="wait">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelReference}
        isCentered
        preserveScrollBarGap
        size="3xl"
        onClose={cancel}
        key="policy-modal"
      >
        <AlertDialogOverlay>
          <motion.div
            initial={{ scale: 0.2, position: 'relative', opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1, width: '100%' }}
            exit={{ scale: 0.2, opacity: 0.2 }}
            transition={{ duration: 0.8, bounce: 0.7, type: 'spring' }}
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
                      `linear-gradient(60deg, #422AFB 0%, ${chroma('#422AFB')
                        .brighten(0.1)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, #422AFB 0%, ${chroma('#422AFB')
                        .brighten(1)
                        .hex()} 100%)`,
                      `linear-gradient(60deg, ${chroma('#422AFB')
                        .brighten(1.2)
                        .hex()} 0%, #422AFB 100%)`,
                      `linear-gradient(60deg, ${chroma('#422AFB')
                        .brighten(0)
                        .hex()} 0%, #422AFB 100%)`,
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
                    Add / Edit Policy
                  </AlertDialogHeader>
                </motion.div>
              </AnimatePresence>

              <AlertDialogBody py={4} minHeight="120px">
                <FormProvider {...formContext}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                      <FormControl pt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input {...register('name')} variant="flushed" />
                      </FormControl>
                      <FormControl pt={4}>
                        <FormLabel>Type</FormLabel>
                        <Select {...register('type')} variant="flushed">
                          {PolicyRuleTemplates.map((row) => (
                            <option value={row.type}>{row.name}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <PolicyFactory type={watchType} />
                      <GridItem colSpan={2}>
                        <FormControl pt={4}>
                          <FormLabel>Tags</FormLabel>
                          <TagsAutocomplete id="tags" type={TagType.COLUMN} />
                        </FormControl>
                      </GridItem>
                    </Grid>
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

export const PolicyModal = create(PolicyModalComponent);
