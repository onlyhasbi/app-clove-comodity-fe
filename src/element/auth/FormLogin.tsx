import {
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
  telepon: '',
  password: '',
};

const schema = z
  .object({
    telepon: z.string().nonempty({ message: 'Nomor telepon belum diisi' }),
    password: z.string().nonempty({ message: 'Kata sandi belum diisi' }),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={Boolean(errors.telepon)}>
          <FormLabel color={'gray.600'}>Telepon</FormLabel>
          <Input
            type="text"
            color={'gray.600'}
            placeholder="Nomor Telepon"
            {...register('telepon')}
          />
          <FormErrorMessage>
            {errors.telepon && errors.telepon.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel color={'gray.600'}>Kata sandi</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              color={'gray.600'}
              placeholder="Kata sandi"
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
        <Button
          type="submit"
          bg="brand.100"
          color="white"
          size="md"
          width="full"
          _hover={{ bg: 'brand.100', opacity: 0.9 }}
        >
          Masuk
        </Button>
      </VStack>
    </form>
  );
}

export default SignInForm;
