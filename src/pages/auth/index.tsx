import SignInForm from '../../element/auth/FormLogin';
import logo from '../../assets/logo.svg';
import { Box, Container, Text, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
          <img src={logo} alt="clove-comodity-logo" />
        </Box>
        <Box mt={8} mb={4}>
          <SignInForm />
        </Box>
        <Wrap direction="row" justify="center" color="gray.600">
          <Text>Belum memiliki akun ?</Text>
          <Text
            fontWeight="bold"
            cursor="pointer"
            _hover={{ color: 'brand.100' }}
          >
            <Link to="/signup">Daftar</Link>
          </Text>
        </Wrap>
      </Box>
    </Container>
  );
}

export default SignIn;
