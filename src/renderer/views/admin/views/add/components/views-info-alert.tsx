import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';

export const ViewsInfoAlert = () => {
  const {
    isOpen: isAlertVisible,
    onClose: onAlertClose,
    onOpen: onAlertOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      {isAlertVisible && (
        <Alert
          status="info"
          variant="top-accent"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          textAlign="center"
        >
          <Flex alignItems="center">
            <AlertIcon boxSize="50px" />
            <AlertDescription>
              View represents a configured table in ElectroCRUD. Each table must
              be added as view in ElectroCRUD.
            </AlertDescription>
          </Flex>

          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={onAlertClose}
          />
        </Alert>
      )}
    </>
  );
};
