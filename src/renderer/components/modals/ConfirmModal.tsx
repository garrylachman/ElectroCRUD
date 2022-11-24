import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { FC, useCallback, useRef } from 'react';
import { ModalProps } from './ModalProps';

export type ConfirmModalProps = ModalProps<boolean>;

export const ConfirmModal: FC<ConfirmModalProps> = ({
  onModalClose,
  isModalOpenState,
  title = 'Confirm',
  children,
  size,
}) => {
  const [isOpen, { off }] = isModalOpenState;
  const cancelRef = useRef(null);

  const handle = useCallback(
    (result: boolean) => {
      if (isOpen && onModalClose) {
        onModalClose(result);
      }
      off();
    },
    [isOpen, off, onModalClose]
  );

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={off}
      leastDestructiveRef={cancelRef}
      isCentered
      preserveScrollBarGap
      size={size}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => handle(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handle(true)} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
