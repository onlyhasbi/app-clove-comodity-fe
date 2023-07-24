import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Textarea,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaHasilPengeringan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormHasilPengeringan = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaHasilPengeringan),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.tim)}>
          <FormLabel htmlFor="tim">Berat (Kg)</FormLabel>
          <Select id="tim" placeholder="Pilih Tim" {...register('tim')}>
            <option value="option1">Rakko 1</option>
          </Select>
          <FormErrorMessage>
            {errors.tim && errors.tim.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat_kg)}>
          <FormLabel htmlFor="berat_kg">Berat (Kg)</FormLabel>
          <Input id="berat_kg" placeholder="Berat" {...register('berat_kg')} />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume_liter)}>
          <FormLabel htmlFor="volume_liter">Volume (Ltr)</FormLabel>
          <Input
            id="volume_liter"
            placeholder="Volume"
            {...register('volume_liter')}
          />
          <FormErrorMessage>
            {errors.volume_liter && errors.volume_liter.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.waktu_selesai)}>
          <FormLabel htmlFor="waktu_mulai">Waktu Selesai</FormLabel>
          <Input
            id="waktu_selesai"
            placeholder="Waktu Selesai"
            {...register('waktu_selesai')}
          />
          <FormErrorMessage>
            {errors.waktu_selesai && errors.waktu_selesai.message}
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

export default FormHasilPengeringan;
