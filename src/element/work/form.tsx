import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaPekerjaan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormPenawaran = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPekerjaan),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        gap={{ lg: 5, base: 4 }}
      >
        <FormControl isInvalid={Boolean(errors.nama_pekerjaan)}>
          <FormLabel htmlFor="nama_pekerjaan">Nama Pekerjaan</FormLabel>
          <Input
            id="nama_pekerjaan"
            placeholder="Nama Pekerjaan"
            {...register('nama_pekerjaan')}
          />
          <FormErrorMessage>
            {errors.nama_pekerjaan && errors.nama_pekerjaan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.upah)}>
          <FormLabel htmlFor="upah">Upah</FormLabel>
          <Input id="upah" placeholder="Upah" {...register('upah')} />
          <FormErrorMessage>
            {errors.upah && errors.upah.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.satuan)}>
          <FormLabel htmlFor="satuan">Satuan</FormLabel>
          <Select
            id="satuan"
            placeholder="Pilih Satuan"
            {...register('satuan')}
          >
            <option value="kg">Kg</option>
            <option value="ltr">Ltr</option>
            <option value="harian">Harian</option>
          </Select>
          <FormErrorMessage>
            {errors.satuan && errors.satuan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.lokasi)}>
          <FormLabel htmlFor="lokasi">Lokasi</FormLabel>
          <Select
            id="lokasi"
            placeholder="Pilih Lokasi"
            {...register('lokasi')}
          >
            <option value="malino">Malino</option>
            <option value="sengkang">Sengkang</option>
          </Select>
          <FormErrorMessage>
            {errors.lokasi && errors.lokasi.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
      <HStack justify="end" gap={3} marginTop={5}>
        <Button type="button" variant="ghost">
          Batal
        </Button>
        <Button type="submit" variant="primary">
          Simpan
        </Button>
      </HStack>
    </form>
  );
};

export default FormPenawaran;
