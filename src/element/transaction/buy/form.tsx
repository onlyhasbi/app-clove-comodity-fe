import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Textarea,
  Select,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaPembelian } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormPembeli = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPembelian),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.id_penjual)}>
          <FormLabel fontSize="sm" htmlFor="id_penjual">ID Pembeli</FormLabel>
          <Input
            id="id_penjual"
            placeholder="ID Pembeli"
            {...register('id_penjual')}
          />
          <FormErrorMessage>
            {errors.id_penjual && errors.id_penjual.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.jenis_komoditas)}>
          <FormLabel fontSize="sm" htmlFor="jenis_komoditas">Komoditas</FormLabel>
          <Select
            id="tim"
            placeholder="Pilih Jenis Komoditas"
            {...register('jenis_komoditas')}
          >
            <option value="option1">Cengkeh basah</option>
            <option value="option1">Cengkeh kering</option>
          </Select>
          <FormErrorMessage>
            {errors.jenis_komoditas && errors.jenis_komoditas.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat_kg)}>
          <FormLabel fontSize="sm" htmlFor="berat_kg">Berat (Kg)</FormLabel>
          <Input id="berat_kg" placeholder="Berat" {...register('berat_kg')} />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.harga_rp)}>
          <FormLabel fontSize="sm" htmlFor="harga_rp">Harga (Rp)</FormLabel>
          <Input id="harga_rp" placeholder="Harga" {...register('harga_rp')} />
          <FormErrorMessage>
            {errors.harga_rp && errors.harga_rp.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="tanggal">Tanggal</FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
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

export default FormPembeli;
