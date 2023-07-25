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

import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaLahan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdate } from './types';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormLahan = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaLahan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama, provinsi, kabupaten, status_lahan, luas_lahan, alamat } =
        initialValues;
      setValue('nama', nama);
      setValue('provinsi', provinsi);
      setValue('kabupaten', kabupaten);
      setValue('status_lahan', status_lahan);
      setValue('luas_lahan', luas_lahan);
      setValue('alamat', alamat);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      console.log('update', data);
      handleCloseModal();
    } else {
      console.log('add', data);
    }
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
            <option value="sulsel">Sulawesi Selatan</option>
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
            <option value="makassar">Makassar</option>
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
        <Button type="button" variant="ghost" onClick={handleCloseModal}>
          Batal
        </Button>
        <Button type="submit" bg="brand.100" color="white">
          {`${initialValues ? 'Perbarui' : 'Simpan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormLahan;
