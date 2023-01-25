import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { StepperStep } from '@saas-ui/react';
import { Stepper } from '@saas-ui/stepper';
import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import { FC, useCallback, useState } from 'react';
import { InstanceProps } from 'react-modal-promise';
import { MotionBox } from 'renderer/components/motions';
import { WithErrorComponent } from 'renderer/containers/error';
import { AccountRO } from 'renderer/defenitions/record-object';
import { ConnectionConfig, FileConnectionConfig, ServerConnectionConfig, ServerTypeEnum } from 'shared';

import {
  AccountsWizardDetails,
  AccountsWizardFileConnection,
  AccountsWizardServerConnection,
  AccountsWizardTest,
} from './steps';
import { useConnectionTest } from './use-connection-test';

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

export type AddAccountWizardStepProperties<T> = {
  back: () => void;
  next: (data?: Record<string, any>) => void;
  initialValue?: T;
};

export type AddAccountWizardProperties = {
  account?: AccountRO;
} & InstanceProps<unknown>;

export const AddAccountWizard: FC<AddAccountWizardProperties> = ({
  onResolve,
  onReject,
  isOpen = true,
  account = {},
}) => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<Partial<AccountRO>>(account);
  const connctionTest = useConnectionTest(state);

  const back = () => setStep(step - 1);
  const next = (data?: Record<string, any>) => {
    switch (step) {
      case 0: {
        setState((previous) => ({
          ...previous,
          ...data,
        }));
        break;
      }
      case 1: {
        setState((previous) => ({
          ...previous,
          connection: data as ConnectionConfig,
        }));
        break;
      }
      case 2: {
        onResolve(state);
        break;
      }
      default: {
        break;
      }
    }
    setStep(step + 1);
  };

  const AccountsWizardConnection = useCallback(
    () =>
      state.client === ServerTypeEnum.SQLITE ? (
        <AccountsWizardFileConnection
          next={next}
          back={back}
          initialValue={state?.connection as FileConnectionConfig}
        />
      ) : (
        <AccountsWizardServerConnection
          next={next}
          back={back}
          initialValue={state?.connection as ServerConnectionConfig}
        />
      ),
    [state.client, next, back]
  );

  const steps = [
    {
      name: 'account-details',
      title: 'Account Details',
      children: (
        <AccountsWizardDetails
          next={next}
          back={back}
          initialValue={_.pick(state, ['name', 'client'])}
        />
      ),
    },
    {
      name: 'account-database',
      title: 'Database',
      children: <AccountsWizardConnection />,
    },
    {
      name: 'connectivity',
      title: 'Connectivity',
      children: (
        <AccountsWizardTest
          next={next}
          back={back}
          connctionTest={connctionTest}
        />
      ),
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <Modal
        isOpen={isOpen}
        preserveScrollBarGap
        size="4xl"
        onClose={onReject}
        key="add-account-modal"
        useInert
        trapFocus
      >
        <ModalOverlay>
          <motion.div
            onClick={(error_) => error_.stopPropagation()}
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
              <WithErrorComponent>
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
                    Accounts Wizard
                  </ModalHeader>
                </motion.div>

                <ModalBody py={4}>
                  <Stepper step={step} mb="2" orientation="vertical">
                    {steps.map(({ name, title, children }) => (
                      <StepperStep key={name} name={name} title={title}>
                        {children}
                      </StepperStep>
                    ))}
                  </Stepper>
                </ModalBody>
              </WithErrorComponent>
            </ModalContent>
          </motion.div>
        </ModalOverlay>
      </Modal>
    </AnimatePresence>
  );
};
