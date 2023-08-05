import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import {
  TSchemaTim,
  TSchemaUpdateTim,
  defaultValues,
  schemaTim,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TSchemaTim | TSchemaUpdateTim) => void;
  initialValues: TSchemaUpdateTim | undefined | boolean;
};

const FormTim = ({
  isLoading,
  onSave: handleSave,
  onClose: handleCloseModal,
  initialValues,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaTim),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama_tim, ketua_tim } = initialValues;
      setValue('nama_tim', nama_tim);
      setValue('ketua_tim', ketua_tim);
    }
  }, []);

  const onSubmit = (payload: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TSchemaUpdateTim).id,
        ...payload,
      } as TSchemaUpdateTim);
    } else {
      handleSave(payload as TSchemaTim);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.nama_tim)}>
          <FormLabel fontSize="sm" htmlFor="nama_tim">
            Nama
          </FormLabel>
          <Input
            id="nama_tim"
            placeholder="Nama Tim"
            {...register('nama_tim')}
          />
          <FormErrorMessage>
            {errors.nama_tim && errors.nama_tim.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.ketua_tim)}>
          <FormLabel fontSize="sm" htmlFor="ketua_tim">
            Ketua
          </FormLabel>
          <Input
            id="ketua_tim"
            placeholder="Ketua Tim"
            {...register('ketua_tim')}
          />
          <FormErrorMessage>
            {errors.ketua_tim && errors.ketua_tim.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack justify="end" gap={3} marginTop={4}>
        <Button
          disabled={isLoading}
          onClick={handleCloseModal}
          type="button"
          variant="ghost"
        >
          Batal
        </Button>
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Menyimpan..."
          spinnerPlacement="start"
        >
          {`${initialValues ? 'Perbarui' : 'Simpan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormTim;
