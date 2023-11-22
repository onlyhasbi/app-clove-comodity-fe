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
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { useReducer } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const defaultValues = {
  nomor_telpon: '',
  sandi: '',
};

const schema = z
  .object({
    nomor_telpon: z.string().nonempty({ message: 'Nomor telepon belum diisi' }),
    sandi: z.string().nonempty({ message: 'Kata sandi belum diisi' }),
  })
  .required();

export type SignInPayload = z.infer<typeof schema>;

type Props = {
  isLoading?: boolean;
  onSignIn: (data: SignInPayload) => void;
};

function SignInForm({ onSignIn, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const [show, toggle] = useReducer((prev) => !prev, false);

  const onSubmit = (payload: FieldValues) => {
    onSignIn(payload as SignInPayload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={Boolean(errors.nomor_telpon)}>
          <FormLabel color={'gray.600'}>Nomor Telepon</FormLabel>
          <Input
            type="text"
            color={'gray.600'}
            placeholder="Nomor Telepon"
            {...register('nomor_telpon')}
          />
          <FormErrorMessage>
            {errors.nomor_telpon && errors.nomor_telpon.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.sandi)}>
          <FormLabel color={'gray.600'}>Sandi</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              color={'gray.600'}
              placeholder="Kata sandi"
              {...register('sandi')}
            />
            <InputRightElement>
              <IconButton
                aria-label="sandi toggle"
                color="gray.600"
                variant="ghost"
                _hover={{ bg: 'none' }}
                _active={{
                  bg: 'none',
                }}
                onClick={toggle}
                icon={show ? <RiEyeFill /> : <RiEyeOffFill />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.sandi && errors.sandi.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          size="md"
          width="full"
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Masuk..."
          spinnerPlacement="start"
        >
          Masuk
        </Button>
      </VStack>
    </form>
  );
}

export default SignInForm;
