import SignUpForm from '../../element/register/FormRegister';
import { Center, Stack, Text, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <Center w="full" minH="100vh" paddingY={{ lg: '2rem', base: '5rem' }}>
      <Stack direction="column">
        <SignUpForm />
        <Wrap direction="row" justify="center" color="gray.600">
          <Text>Sudah punya akun ?</Text>
          <Text
            fontWeight="bold"
            cursor="pointer"
            _hover={{ color: 'green.600' }}
          >
            <Link to="/signin">Masuk</Link>
          </Text>
        </Wrap>
      </Stack>
    </Center>
  );
}

export default SignUp;
