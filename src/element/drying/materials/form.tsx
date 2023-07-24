import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaBahanPengeringan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSetoran = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaBahanPengeringan),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.buruh)}>
          <FormLabel htmlFor="buruh">Buruh</FormLabel>
          <Select id="buruh" placeholder="Pilih Buruh" {...register('buruh')}>
            <option value="option1">Malino</option>
          </Select>
          <FormErrorMessage>
            {errors.buruh && errors.buruh.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat)}>
          <FormLabel htmlFor="berat">Berat</FormLabel>
          <Input id="berat" placeholder="Berat" {...register('berat')} />
          <FormErrorMessage>
            {errors.berat && errors.berat.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume)}>
          <FormLabel htmlFor="volume">Volume</FormLabel>
          <Input id="volume" placeholder="Volume" {...register('volume')} />
          <FormErrorMessage>
            {errors.volume && errors.volume.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel htmlFor="tanggal">Tanggal</FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack justify="end" gap={3} marginTop={4}>
        <Button type="button" variant="ghost">
          Batal
        </Button>
        <Button type="submit" bg="brand.100" color="white">
          Simpan
        </Button>
      </HStack>
    </form>
  );
};

export default FormSetoran;
