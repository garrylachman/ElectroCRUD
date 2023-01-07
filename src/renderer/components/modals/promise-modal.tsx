import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import { FC, ReactNode, RefObject, useCallback, useMemo, useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { create, InstanceProps } from 'react-modal-promise';

import {
  ActionButtonsFactory,
  ActionButtonType,
} from '../buttons/action-button';
import { MotionBox } from '../motions/motion-box';

const flip = {
  hidden: {
    transform: 'scale(0) rotateX(-360deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: 'scale(1) rotateX(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotateX(360deg)',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export type PromiseModalContentProperties = {
  formRef?: RefObject<HTMLFormElement>;
  formCtxRef?: React.ForwardedRef<UseFormReturn<FieldValues, any>>;
};

export type PromiseModalProperties = {
  keyu: string;
  title?: string | ReactNode;
  size?: string;
  children: FC<PromiseModalContentProperties>;
  actionButtons?: ActionButtonType[];
} & InstanceProps<unknown>;

export const PromiseModalComponent: FC<PromiseModalProperties> = ({
  keyu,
  isOpen = true,
  onResolve,
  onReject,
  title = 'Confirm',
  size = 'md',
  children,
  actionButtons = [],
}) => {
  const formReference: RefObject<HTMLFormElement | undefined> =
    useRef<HTMLFormElement>();
  const formContextReference = useRef<UseFormReturn<FieldValues, any>>();

  const RenderContent = useCallback(
    (properties: PromiseModalContentProperties) => children(properties),
    [children]
  );

  const handleButtonByType = async (buttonType: ActionButtonType) => {
    switch (buttonType) {
      case ActionButtonType.SAVE: {
        const { current } = formContextReference;
        const result = await current?.trigger();
        if (result) {
          onResolve(current?.getValues());
        }
        break;
      }
      default: {
        onReject();
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Modal
        isOpen={isOpen}
        preserveScrollBarGap
        size={size}
        onClose={onReject}
        key={`promise-alert-${keyu}`}
        useInert
        trapFocus
      >
        <ModalOverlay>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal  orange-gradient"
            variants={flip}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalContent
              overflow="visible"
              rounded={10}
              shadow="sm"
              as={MotionBox}
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
                <ModalHeader
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  py={3}
                >
                  {title}
                </ModalHeader>
              </motion.div>

              <ModalBody py={4}>
                <RenderContent
                  formRef={formReference}
                  formCtxRef={formContextReference}
                />
              </ModalBody>

              <ModalFooter py={4} pt={2} gap={4}>
                {actionButtons.map((buttonType) => (
                  <ActionButtonsFactory
                    key={`ActionButtonsFactory-${buttonType}`}
                    actionType={buttonType}
                    onClick={() => handleButtonByType(buttonType)}
                  />
                ))}
              </ModalFooter>
            </ModalContent>
          </motion.div>
        </ModalOverlay>
      </Modal>
    </AnimatePresence>
  );
};

export const PromiseModal = create(PromiseModalComponent);
