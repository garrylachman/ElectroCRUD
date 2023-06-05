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
import { FC, ReactNode, RefObject, useCallback, useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { create, InstanceProps } from 'react-modal-promise';

import { ActionButtonsFactory, ActionButtonType } from '@electrocrud/buttons';
import { MotionBox } from '../motions/motion-box';

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
  getValue?: () => any;
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
  getValue,
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
      case ActionButtonType.APPLY_FILTER: {
        if (getValue) {
          onResolve({ action: 'apply', value: getValue() });
        }
        break;
      }
      case ActionButtonType.SAVE_AND_APPLY_FILTER: {
        if (getValue) {
          onResolve({ action: 'save-and-apply', value: getValue() });
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
            onClick={(event) => event.stopPropagation()}
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
                  // @ts-ignore
                  formRef={formReference}
                  // @ts-ignore
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
