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
import { defaultValues, schemaLahan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormLahan = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaLahan),
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

        <FormControl isInvalid={Boolean(errors.provinsi)}>
          <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
          <Select
            id="provinsi"
            placeholder="Pilih Provinsi"
            {...register('provinsi')}
          >
            <option value="option1">Sulawesi Selatan</option>
          </Select>
          <FormErrorMessage>
            {errors.provinsi && errors.provinsi.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.kabupaten)}>
          <FormLabel htmlFor="kabupaten">Kabupaten</FormLabel>
          <Select
            id="kabupaten"
            placeholder="Pilih Kabupaten"
            {...register('kabupaten')}
          >
            <option value="option1">Makassar</option>
          </Select>
          <FormErrorMessage>
            {errors.kabupaten && errors.kabupaten.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.status_lahan)}>
          <FormLabel htmlFor="status_lahan">Status lahan</FormLabel>
          <Input
            id="status_lahan"
            placeholder="Status lahan"
            {...register('status_lahan')}
          />
          <FormErrorMessage>
            {errors.status_lahan && errors.status_lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.luas_lahan)}>
          <FormLabel htmlFor="luas_lahan">Luas lahan</FormLabel>
          <Input
            id="luas_lahan"
            placeholder="Luas lahan"
            {...register('luas_lahan')}
          />
          <FormErrorMessage>
            {errors.luas_lahan && errors.luas_lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.alamat)}>
          <FormLabel htmlFor="alamat">Alamat</FormLabel>
          <Textarea
            id="alamat"
            rows={3}
            placeholder="Alamat"
            {...register('alamat')}
          />
          <FormErrorMessage>
            {errors.alamat && errors.alamat.message}
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

export default FormLahan;
