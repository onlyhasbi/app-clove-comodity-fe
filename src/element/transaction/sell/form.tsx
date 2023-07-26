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
import { defaultValues, schemaPenjualan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdate } from './types';
import { useEffect } from 'react';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormPenjualan = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPenjualan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const {
        id_penjual,
        jenis_komoditas,
        berat_kg,
        harga_rp,
        tanggal,
        catatan,
      } = initialValues;

      setValue('id_penjual', id_penjual);
      setValue('jenis_komoditas', jenis_komoditas);
      setValue('berat_kg', berat_kg);
      setValue('harga_rp', harga_rp);
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
        <FormControl isInvalid={Boolean(errors.id_penjual)}>
          <FormLabel fontSize="sm" htmlFor="id_penjual">
            ID Penjual
          </FormLabel>
          <Input
            id="id_penjual"
            placeholder="ID Penjual"
            {...register('id_penjual')}
          />
          <FormErrorMessage>
            {errors.id_penjual && errors.id_penjual.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.jenis_komoditas)}>
          <FormLabel fontSize="sm" htmlFor="jenis_komoditas">
            Komoditas
          </FormLabel>
          <Select
            id="tim"
            placeholder="Pilih Jenis Komoditas"
            {...register('jenis_komoditas')}
          >
            <option value="Cengkeh Basah">Cengkeh basah</option>
            <option value="Cengkeh Kering">Cengkeh kering</option>
          </Select>
          <FormErrorMessage>
            {errors.jenis_komoditas && errors.jenis_komoditas.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat_kg)}>
          <FormLabel fontSize="sm" htmlFor="berat_kg">
            Berat (Kg)
          </FormLabel>
          <Input id="berat_kg" placeholder="Berat" {...register('berat_kg')} />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.harga_rp)}>
          <FormLabel fontSize="sm" htmlFor="harga_rp">
            Harga (Rp)
          </FormLabel>
          <Input id="harga_rp" placeholder="Harga" {...register('harga_rp')} />
          <FormErrorMessage>
            {errors.harga_rp && errors.harga_rp.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="tanggal">
            Tanggal
          </FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel fontSize="sm" htmlFor="catatan">
            Catatan
          </FormLabel>
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

export default FormPenjualan;
