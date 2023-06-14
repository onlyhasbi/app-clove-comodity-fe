import SignInForm from '../../element/auth/FormLogin';
import logo from '../../assets/logo.svg';
import { Box, Container } from '@chakra-ui/react';

function SignIn() {
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
          <img src={logo} />
        </Box>
        <SignInForm />
      </Box>
    </Container>
  );
}

export default SignIn;
