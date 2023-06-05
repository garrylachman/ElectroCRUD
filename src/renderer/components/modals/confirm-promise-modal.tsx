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

import { RippleButton } from '@electrocrud/buttons';
import { MotionBox } from '../motions/motion-box';

const flip = {
  hidden: {
    transform: 'translateZ(500px) translateX(-5px) rotateY(90deg)',
    transformOrigin: '50% 100%',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: 'translateZ(0px) translateX(0%) rotateY(0deg)',
    transformOrigin: '50% 100%',
    opacity: 1,
    transition: {
      duration: 0.5,
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
        preserveScrollBarGap
        size={size}
        onClose={cancel}
        key={`confirm-alert-${keyu}`}
        useInert
        trapFocus
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
              overflow="hidden"
              rounded={10}
              shadow="sm"
              as={MotionBox}
              _hover={{ shadow: 'xl' }}
            >
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
