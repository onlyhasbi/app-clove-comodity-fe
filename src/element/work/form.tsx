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
import { useEffect } from 'react';
import { TUpdate } from './types';

type Props = {
  initialValues: TUpdate | undefined | boolean;
  onReset: () => void;
};

const FormPenawaran = ({ onReset: handleReset, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPekerjaan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama_pekerjaan, upah, satuan, lokasi } = initialValues;
      setValue('nama_pekerjaan', nama_pekerjaan);
      setValue('upah', upah);
      setValue('satuan', satuan);
      setValue('lokasi', lokasi);
    }
  }, [initialValues]);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      console.log('update', data);
    } else {
      console.log('add', data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        gap={{ lg: 5, base: 4 }}
      >
        <FormControl isInvalid={Boolean(errors.nama_pekerjaan)}>
          <FormLabel fontSize="sm" htmlFor="nama_pekerjaan">
            Nama Pekerjaan
          </FormLabel>
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
          <FormLabel fontSize="sm" htmlFor="upah">
            Upah
          </FormLabel>
          <Input id="upah" placeholder="Upah" {...register('upah')} />
          <FormErrorMessage>
            {errors.upah && errors.upah.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.satuan)}>
          <FormLabel fontSize="sm" htmlFor="satuan">
            Satuan
          </FormLabel>
          <Select
            id="satuan"
            placeholder="Pilih Satuan"
            {...register('satuan')}
          >
            <option value="kg">Kg</option>
            <option value="ltr">Ltr</option>
            <option value="Harian">Harian</option>
          </Select>
          <FormErrorMessage>
            {errors.satuan && errors.satuan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.lokasi)}>
          <FormLabel fontSize="sm" htmlFor="lokasi">
            Lokasi
          </FormLabel>
          <Select
            id="lokasi"
            placeholder="Pilih Lokasi"
            {...register('lokasi')}
          >
            <option value="Malino">Malino</option>
            <option value="Sengkang">Sengkang</option>
          </Select>
          <FormErrorMessage>
            {errors.lokasi && errors.lokasi.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
      <HStack justify="end" gap={3} marginTop={6}>
        <Button
          onClick={() => {
            reset();
            handleReset();
          }}
          type="button"
          variant="ghost"
        >
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {`${initialValues ? 'Perbarui' : 'Tambahkan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormPenawaran;
