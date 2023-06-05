import { Flex, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';
import {
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@saas-ui/react';
import { IoLogIn } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Typist from 'react-typist';
import CryptoJS from 'crypto-js';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { SessionReducer } from 'renderer/store/reducers';
import { isEqual } from 'underscore';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordState = useAppSelector((state) => state.settings.password);

  const check = (value: string) => {
    const inputPass = CryptoJS.SHA256(
      `${value}${passwordState.hash}`
    ).toString();
    if (isEqual(inputPass, passwordState.password)) {
      dispatch(SessionReducer.actions.setLoggedIn(true));
      navigate('/');
    }
  };

  return (
    <EmptyStateContainer colorScheme="primary" height="-webkit-fill-available">
      <EmptyStateBody display="flex" alignItems="center" flexDirection="column">
        <EmptyStateIcon
          as={IoLogIn}
          style={{ width: '150px', height: '150px' }}
        />
        <EmptyStateTitle
          fontSize={30}
          lineHeight="auto"
          style={{ marginTop: 15 }}
        >
          <Typist
            startDelay={0}
            avgTypingDelay={100}
            cursor={{ hideWhenDone: true, show: false }}
          >
            <Flex>
              <Text lineHeight="auto">P#$%&*@#</Text>
              <Typist.Backspace count={7} />
              <Text mr={3} lineHeight="auto">
                assword
              </Text>
              <Text
                bgColor="primary.500"
                color="white"
                px={2}
                textDecor="HighlightText"
                lineHeight="auto"
                sx={{ borderRadius: '10px' }}
              >
                Protected
              </Text>
            </Flex>
          </Typist>
        </EmptyStateTitle>
        <EmptyStateDescription marginTop="30px">
          <HStack>
            <PinInput
              mask
              autoFocus
              type="alphanumeric"
              size="lg"
              onComplete={check}
            >
              {Array.from({
                length: passwordState.passwordLenght as number,
              }).map((v, index) => (
                <PinInputField key={`pininput-${index}`} />
              ))}
            </PinInput>
          </HStack>
        </EmptyStateDescription>
      </EmptyStateBody>
    </EmptyStateContainer>
  );
};
