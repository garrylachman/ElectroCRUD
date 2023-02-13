import { Box, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import AnimatedText from 'react-animated-text-content';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { SessionReducer } from 'renderer/store/reducers';
import { LockButton } from '@electrocrud/buttons';

export const Navbar: FC<{ brandText: string }> = ({ brandText }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sessionState = useAppSelector((state) => state.session);

  const logout = () => {
    dispatch(SessionReducer.actions.setLoggedIn(false));
    navigate('/');
  };

  return (
    <Box py={2} px={2} mx={1} overflow="hidden">
      <Flex>
        <Heading width="100%">
          <AnimatedText
            type="chars"
            includeWhiteSpaces
            className="animated-paragraph"
            animationType="bounce"
            threshold={0.5}
            duration={0.3}
          >
            {brandText}
          </AnimatedText>
        </Heading>
        {sessionState.isLoggedIn && <LockButton onClick={logout} />}
      </Flex>
    </Box>
  );
};
