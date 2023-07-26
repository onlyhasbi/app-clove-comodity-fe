import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Textarea,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaBahanPengeringan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TUpdate } from './types';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormBahan = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaBahanPengeringan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { berat_kg, volume_liter, waktu_mulai, catatan } = initialValues;
      setValue('berat_kg', berat_kg);
      setValue('volume_liter', volume_liter);
      setValue('waktu_mulai', waktu_mulai);
      setValue('catatan', catatan);
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
        <FormControl isInvalid={Boolean(errors.berat_kg)}>
          <FormLabel fontSize="sm" htmlFor="berat_kg">Berat (Kg)</FormLabel>
          <Input id="berat_kg" placeholder="Berat" {...register('berat_kg')} />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume_liter)}>
          <FormLabel fontSize="sm" htmlFor="volume_liter">Volume (Ltr)</FormLabel>
          <Input
            id="volume_liter"
            placeholder="Volume"
            {...register('volume_liter')}
          />
          <FormErrorMessage>
            {errors.volume_liter && errors.volume_liter.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.waktu_mulai)}>
          <FormLabel fontSize="sm" htmlFor="waktu_mulai">Waktu Mulai</FormLabel>
          <Input
            id="waktu_mulai"
            placeholder="Waktu Mulai"
            {...register('waktu_mulai')}
          />
          <FormErrorMessage>
            {errors.waktu_mulai && errors.waktu_mulai.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel fontSize="sm" htmlFor="catatan">Catatan</FormLabel>
          <Textarea
            id="catatan"
            rows={3}
            placeholder="Catatan"
            {...register('catatan')}
          />
          <FormErrorMessage>
            {errors.catatan && errors.catatan.message}
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

export default FormBahan;
