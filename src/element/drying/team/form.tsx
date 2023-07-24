import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaTim } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormTim = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaTim),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.nama)}>
          <FormLabel htmlFor="nama">Nama</FormLabel>
          <Input id="nama" placeholder="Nama" {...register('nama')} />
          <FormErrorMessage>
            {errors.nama && errors.nama.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.ketua)}>
          <FormLabel htmlFor="ketua">Ketua</FormLabel>
          <Select id="ketua" placeholder="Pilih Ketua" {...register('ketua')}>
            <option value="option1">Antoni</option>
          </Select>
          <FormErrorMessage>
            {errors.ketua && errors.ketua.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.anggota)}>
          <FormLabel htmlFor="anggota">Anggota</FormLabel>
          <Select
            id="anggota"
            placeholder="Pilih Anggota"
            {...register('anggota')}
          >
            <option value="option1">Antoni</option>
          </Select>
          <FormErrorMessage>
            {errors.anggota && errors.anggota.message}
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

export default FormTim;
