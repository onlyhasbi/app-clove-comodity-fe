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
import { defaultValues, schemaPenawaran } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormPenawaran = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPenawaran),
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
        <FormControl isInvalid={Boolean(errors.jenis_penawaran)}>
          <FormLabel htmlFor="jenis_penawaran">Jenis Penawaran</FormLabel>
          <Select
            id="jenis_penawaran"
            placeholder="Pilih Jenis Penawaran"
            {...register('jenis_penawaran')}
          >
            <option value="penjualan">Penjualan</option>
            <option value="pembelian">Pembelian</option>
          </Select>
          <FormErrorMessage>
            {errors.jenis_penawaran && errors.jenis_penawaran.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.komoditas)}>
          <FormLabel htmlFor="komoditas">Komoditas</FormLabel>
          <Input
            id="komoditas"
            placeholder="Komoditas"
            {...register('komoditas')}
          />
          <FormErrorMessage>
            {errors.komoditas && errors.komoditas.message}
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
          </Select>
          <FormErrorMessage>
            {errors.satuan && errors.satuan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.harga)}>
          <FormLabel htmlFor="harga">Harga</FormLabel>
          <Input id="harga" placeholder="Harga" {...register('harga')} />
          <FormErrorMessage>
            {errors.harga && errors.harga.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.berat_min)}>
          <FormLabel htmlFor="berat_min">Berat Min.</FormLabel>
          <Input
            id="berat_min"
            placeholder="Berat Minimal"
            {...register('berat_min')}
          />
          <FormErrorMessage>
            {errors.berat_min && errors.berat_min.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.berat_max)}>
          <FormLabel htmlFor="berat_max">Berat Maks.</FormLabel>
          <Input
            id="berat_max"
            placeholder="Berat Maksimal"
            {...register('berat_max')}
          />
          <FormErrorMessage>
            {errors.berat_max && errors.berat_max.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
      <HStack gap={3} marginTop={6}>
        <Button type="submit" variant="primary">
          Tambahkan
        </Button>
        <Button type="button" variant="ghost">
          Batal
        </Button>
      </HStack>
    </form>
  );
};

export default FormPenawaran;
