import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from './store/hooks';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const passwordState = useAppSelector((state) => state.settings.password);
  const sessionState = useAppSelector((state) => state.session);

  useEffect(() => {
    if (passwordState.enabled && !sessionState.isLoggedIn) {
      navigate('/login');
    }
  }, [passwordState, sessionState]);

  return <>{children}</>;
};
