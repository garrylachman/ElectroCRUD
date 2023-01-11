import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useRef } from 'react';
import { create, InstanceProps } from 'react-modal-promise';

import { RippleButton } from '../buttons/ripple-button';
import { MotionBox } from '../motions/motion-box';

export type ConfirmPromiseModalProperties = {
  keyu: string;
  title?: string | ReactNode;
  size?: string;
  children?: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColorScheme?: string;
} & InstanceProps<unknown>;

export const ConfirmPromiseModalComponent: FC<
  ConfirmPromiseModalProperties
> = ({
  keyu,
  isOpen = true,
  onResolve,
  onReject,
  title = 'Confirm',
  size = 'md',
  children,
  confirmButtonText = 'Yes',
  cancelButtonText = 'Cancel',
  confirmButtonColorScheme = 'red',
}) => {
  const cancelReference = useRef<FocusableElement>(null);

  const confirm = () => onResolve(true);
  const cancel = () => onReject();

  return (
    <AnimatePresence mode="wait">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelReference}
        isCentered
        preserveScrollBarGap
        size={size}
        onClose={cancel}
        key={`confirm-alert-${keyu}`}
      >
        <AlertDialogOverlay>
          <motion.div
            initial={{ scale: 0.2, position: 'relative', opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1, width: '100%' }}
            exit={{ scale: 0.2, opacity: 0.2 }}
            transition={{ duration: 0.8, bounce: 0.7, type: 'spring' }}
          >
            <AlertDialogContent
              overflow="hidden"
              rounded={10}
              shadow="sm"
              as={MotionBox}
              whileHover={{ y: -5 }}
              _hover={{ shadow: 'xl' }}
            >
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
                >
                  {title}
                </AlertDialogHeader>
              </motion.div>

              <AlertDialogBody py={4}>{children}</AlertDialogBody>

              <AlertDialogFooter py={4} pt={2} gap={4}>
                <RippleButton onClick={cancel} bgColorScheme="red" size="lg">
                  {cancelButtonText}
                </RippleButton>
                <RippleButton
                  onClick={confirm}
                  size="lg"
                  bgColorScheme={confirmButtonColorScheme}
                >
                  {confirmButtonText}
                </RippleButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </motion.div>
        </AlertDialogOverlay>
      </AlertDialog>
    </AnimatePresence>
  );
};

export const ConfirmPromiseModal = create(ConfirmPromiseModalComponent);
