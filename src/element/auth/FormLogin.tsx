import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useReducer } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const defaultValues = {
  username: '',
  password: '',
};

const schema = z
  .object({
    username: z.string().nonempty({ message: 'Username belum diisi' }),
    password: z.string().nonempty({ message: 'Password belum diisi' }),
  })
  .required();

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const [show, toggle] = useReducer((prev) => !prev, false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Box width="xs" borderRadius="lg" padding={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={Boolean(errors.username)}>
            <FormLabel color={'gray.600'}>Username</FormLabel>
            <Input
              type="text"
              color={'gray.600'}
              placeholder="Username"
              {...register('username')}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel color={'gray.600'}>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                color={'gray.600'}
                placeholder="password"
                {...register('password')}
              />
              <InputRightElement>
                <IconButton
                  aria-label="password toggle"
                  color="gray.600"
                  variant="ghost"
                  _hover={{ bg: 'none' }}
                  _active={{
                    bg: 'none',
                  }}
                  onClick={() => {
                    console.log('clicked', show);
                    toggle();
                  }}
                  icon={show ? <RiEyeFill /> : <RiEyeOffFill />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" bg="#548c31" color="#fff" size="md" width="full">
            Sign In
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default SignInForm;
