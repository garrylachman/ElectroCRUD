import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  Flex,
  Icon,
  HStack,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, Dispatch, SetStateAction, FC, useEffect } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps/chakra-ui-steps';
import { NestedPartial } from 'shared';
import {
  MdDone,
  MdNavigateNext,
  MdNavigateBefore,
  MdClose,
} from 'react-icons/md';
import { ModalProps } from './ModalProps';

export type WizardModalStepContentProps<T> = {
  initialValue?: NestedPartial<T>;
  onUpdate: (data: NestedPartial<T>) => void;
  state?: T;
  setState?: Dispatch<SetStateAction<T>>;
  testConnection?: () => void;
  connectionStatus?: 'NOT_TESTED' | 'FAILED' | 'SUCCESS' | 'TESTING';
  connectionError?: string;
};

export type WizardModalStepProps<T> = {
  label?: string;
  description?: string;
  status?: 'error' | 'loading' | undefined;
  isCompletedStep?: boolean;
  StepComponent: FC<WizardModalStepContentProps<T>>;
};

export type WizardModalProps<T> = ModalProps<NestedPartial<T>> & {
  isNext: boolean;
  isNextEnabled: boolean;
  isPrev: boolean;
  isPrevEnabled: boolean;
  isDone?: boolean;
  isDoneEnabled?: boolean;
  isCancel?: boolean;
  isCancelEnabled?: boolean;
  initialStep?: number;
  steps: WizardModalStepProps<NestedPartial<T>>[];
  completedStep: number;
};

export const WizardModal = <TT,>({
  onModalClose,
  isModalOpenState,
  title = 'Wizard',
  size = 'lg',
  initialStep = 0,
  isNext,
  isNextEnabled,
  isPrev,
  isPrevEnabled,
  isDone = false,
  isDoneEnabled = true,
  isCancel = true,
  isCancelEnabled = true,
  steps = [],
  completedStep,
}: WizardModalProps<TT>) => {
  const bg = useColorModeValue('secondaryGray.1000', 'secondaryGray.1100');
  const [isOpen, { off }] = isModalOpenState;
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep,
  });

  /*useEffect(() => {
    if (activeStep > completedStep + 1) {
      setStep(completedStep + 1);
    }
  }, [activeStep, completedStep]);

  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);*/

  const handle = useCallback(
    (result: NestedPartial<TT>) => {
      if (isOpen && onModalClose) {
        onModalClose(result);
      }
      off();
    },
    [isOpen, off, onModalClose]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={off}
      isCentered
      preserveScrollBarGap
      size={size}
    >
      <ModalOverlay />
      <ModalContent style={{ overflow: 'hidden' }}>
        <ModalHeader fontSize="xl" fontWeight="bold">
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column" width="100%">
            <Steps
              size="md"
              activeStep={activeStep}
              labelOrientation="horizontal"
            >
              {steps.map(({ label, description, StepComponent }, stepIndex) => (
                <Step
                  label={label}
                  key={`${label}-${String(stepIndex)}`}
                  description={description}
                  isCompletedStep={stepIndex <= completedStep}
                >
                  <Box pt={6} pb={6}>
                    {StepComponent}
                  </Box>
                </Step>
              ))}
            </Steps>
          </Flex>
        </ModalBody>
        <Divider />
        <ModalFooter bg={bg}>
          <HStack w="100%" justifyContent="space-between">
            <HStack>
              {isPrev && (
                <Button
                  colorScheme="brand"
                  onClick={prevStep}
                  isDisabled={!isPrevEnabled}
                >
                  <Icon mr={1} as={MdNavigateBefore} />
                  Previous
                </Button>
              )}
              {isNext && (
                <Button
                  colorScheme="brand"
                  onClick={nextStep}
                  isDisabled={!isNextEnabled}
                >
                  Next
                  <Icon ml={1} as={MdNavigateNext} />
                </Button>
              )}
            </HStack>
            <HStack>
              {isCancel && (
                <Button
                  colorScheme="red"
                  variant="solid"
                  onClick={off}
                  isDisabled={!isCancelEnabled}
                >
                  <Icon mr={1} as={MdClose} />
                  Cancel
                </Button>
              )}
              {isDone && (
                <Button
                  colorScheme="green"
                  onClick={() => handle(state)}
                  isDisabled={!isDoneEnabled}
                >
                  <Icon mr={1} as={MdDone} />
                  Done
                </Button>
              )}
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
