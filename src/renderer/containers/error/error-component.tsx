import {
  Button,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@saas-ui/react';
import { GiChewedSkull } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

export const ErrorComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <EmptyStateContainer colorScheme="purple">
      <EmptyStateBody display="flex" alignItems="center" flexDirection="column">
        <EmptyStateIcon as={GiChewedSkull} />

        <EmptyStateTitle sx={{ marginTop: 3 }}>
          Whoops, something went wrong
        </EmptyStateTitle>
        <EmptyStateDescription>Where do you want to go?</EmptyStateDescription>
        <EmptyStateActions>
          <Button colorScheme="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
          <Button
            colorScheme="purple"
            variant="ghost"
            onClick={() => navigate(location.pathname, { replace: true })}
          >
            Reload
          </Button>
        </EmptyStateActions>
      </EmptyStateBody>
    </EmptyStateContainer>
  );
};
