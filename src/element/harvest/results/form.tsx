import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaHasil } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TUpdate } from './types';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormHasil = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaHasil),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { lahan, berat, tanggal, catatan } = initialValues;

      setValue('lahan', lahan);
      setValue('berat', berat);
      setValue('tanggal', tanggal);
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
        <FormControl isInvalid={Boolean(errors.lahan)}>
          <FormLabel htmlFor="lahan">Lahan</FormLabel>
          <Input id="lahan" placeholder="Lahan" {...register('lahan')} />
          <FormErrorMessage>
            {errors.lahan && errors.lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat)}>
          <FormLabel htmlFor="berat">Berat</FormLabel>
          <Input id="berat" placeholder="Berat" {...register('berat')} />
          <FormErrorMessage>
            {errors.berat && errors.berat.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel htmlFor="tanggal">Tanggal</FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel htmlFor="catatan">Catatan</FormLabel>
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

export default FormHasil;
