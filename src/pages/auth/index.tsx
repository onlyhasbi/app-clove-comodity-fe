import SignInForm, { SignInPayload } from '../../features/auth/FormLogin';
import logo from '../../assets/logo.svg';
import { isAuthenticated, setToken, useAuth } from '../../hooks/useAuth.hook';
import { Box, Container, Text, Wrap } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function SignIn() {
  const navigate = useNavigate();
  const isAuthSuccess = isAuthenticated(import.meta.env.VITE_TOKEN_NAME);

  const onSuccess = useCallback((data: any) => {
    const token = data?.data?.data;
    setToken(import.meta.env.VITE_TOKEN_NAME, JSON.stringify(token));
  }, []);

  const onError = useCallback((error: any) => {
    console.log(error)
    const errorMessage =
      error?.response?.data?.statusCode == 400
        ? 'Nomor telepon dan sandi salah'
        : error?.response?.data?.message;
    if (errorMessage) toast.error(errorMessage);
  }, []);

  const signIn = useAuth({ onSuccess, onError });

  const handleSignIn = (data: SignInPayload) => {
    signIn.mutate(data);
  };

  useEffect(() => {
    if (isAuthSuccess) navigate('/', { replace: true });
  }, [isAuthSuccess, navigate]);

  if (isAuthSuccess) return null;

  return (
    <Container
      width="full"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Box width="52" mx="auto">
          <img src={logo} alt="clove-comodity-logo" />
        </Box>
        <Box mt={8} mb={4}>
          <SignInForm onSignIn={handleSignIn} isLoading={signIn.isLoading} />
        </Box>
        <Wrap direction="row" justify="center" color="gray.600">
          <Text>Belum punya akun ?</Text>
          <Box fontWeight="bold" cursor="pointer" _hover={{ color: 'green.600' }}>
            {signIn.isLoading ? (
              <Text>Daftar</Text>
            ) : (
              <Link to="/signup">Daftar</Link>
            )}
          </Box>
        </Wrap>
      </Box>
    </Container>
  );
}

export default SignIn;
