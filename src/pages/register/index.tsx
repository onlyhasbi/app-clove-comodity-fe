import { Center, Stack, Text, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <Center w="full" h="100vh">
      <Stack direction="column">
        <Text fontSize="3xl" fontWeight="bold">
          Register Form
        </Text>
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
