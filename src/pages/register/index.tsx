import SignUpForm from '../../element/register/FormRegister';
import { Center, Stack, Text, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <Center w="full" h="100vh">
      <Stack direction="column">
        <SignUpForm />
        <Wrap direction="row" justify="center" color="gray.600">
          <Text>Sudah punya akun ?</Text>
          <Text
            fontWeight="bold"
            cursor="pointer"
            _hover={{ color: 'brand.100' }}
          >
            <Link to="/signin">Masuk</Link>
          </Text>
        </Wrap>
      </Stack>
    </Center>
  );
}

export default SignUp;
