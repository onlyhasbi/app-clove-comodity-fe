import { FallbackProps } from 'react-error-boundary';
import { deleteToken } from '../hooks/useAuth.hook';
import { ErrorTemplate } from './ErrorTemplate';

export type Props = {
  title: string;
  action: () => void;
};

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error)
  const handleError = () => {
    deleteToken(import.meta.env.VITE_TOKEN_NAME);
    resetErrorBoundary();
  };
  return <ErrorTemplate title="Terjadi Kesalahan" action={handleError} />;
}

export default ErrorFallBack;
