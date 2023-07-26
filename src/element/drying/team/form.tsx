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
import { useEffect } from 'react';
import { TUpdate } from './types';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormTim = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaTim),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama, ketua, anggota } = initialValues;
      setValue('nama', nama);
      setValue('ketua', ketua);
      setValue('anggota', anggota);
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
          <FormLabel fontSize="sm" htmlFor="nama">
            Nama
          </FormLabel>
          <Input id="nama" placeholder="Nama" {...register('nama')} />
          <FormErrorMessage>
            {errors.nama && errors.nama.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.ketua)}>
          <FormLabel fontSize="sm" htmlFor="ketua">
            Ketua
          </FormLabel>
          <Select id="ketua" placeholder="Pilih Ketua" {...register('ketua')}>
            <option value="Aso">Aso</option>
            <option value="Antoni">Antoni</option>
          </Select>
          <FormErrorMessage>
            {errors.ketua && errors.ketua.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.anggota)}>
          <FormLabel fontSize="sm" htmlFor="anggota">
            Anggota
          </FormLabel>
          <Select
            id="anggota"
            placeholder="Pilih Anggota"
            {...register('anggota')}
          >
            <option value="Ahmad">Ahmad</option>
          </Select>
          <FormErrorMessage>
            {errors.anggota && errors.anggota.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack justify="end" gap={3} marginTop={4}>
        <Button onClick={handleCloseModal} type="button" variant="ghost">
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {`${initialValues ? 'Perbarui' : 'Simpan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormTim;
