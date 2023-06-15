import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const isAuthSuccess = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthSuccess) navigate('/signin');
    if (isAuthSuccess) navigate('/');
  }, []);

  return isAuthSuccess;
}
