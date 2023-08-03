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

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TSchemaPenawaran,
  TSchemaUpdatePenawaran,
  defaultValues,
  schemaPenawaran,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TUpdate } from './types';
import { NumericFormat } from 'react-number-format';

type Props = {
  initialValues: TUpdate | undefined | boolean;
  onReset: () => void;
  onSave: (payload: TSchemaPenawaran | TSchemaUpdatePenawaran) => void;
};

const FormPenawaran = ({
  onReset: handleReset,
  onSave,
  initialValues,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPenawaran),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const {
        jenis_penawaran,
        komoditas,
        satuan,
        harga,
        berat_min,
        berat_max,
      } = initialValues;
      setValue('jenis_penawaran', jenis_penawaran);
      setValue('komoditas', komoditas);
      setValue('satuan', satuan);
      setValue('harga', harga);
      setValue('berat_min', berat_min);
      setValue('berat_max', berat_max);
    }
  }, [initialValues]);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      onSave({ id: initialValues.id, ...(data as TSchemaPenawaran) });
    } else {
      onSave(data as TSchemaPenawaran);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        gap={{ lg: 5, base: 4 }}
      >
        <FormControl isInvalid={Boolean(errors.jenis_penawaran)}>
          <FormLabel fontSize="sm" htmlFor="jenis_penawaran">
            Jenis Penawaran
          </FormLabel>
          <Select
            id="jenis_penawaran"
            placeholder="Pilih Jenis Penawaran"
            {...register('jenis_penawaran')}
          >
            <option value="Penjualan">Penjualan</option>
            <option value="Pembelian">Pembelian</option>
          </Select>
          <FormErrorMessage>
            {errors.jenis_penawaran && errors.jenis_penawaran.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.komoditas)}>
          <FormLabel fontSize="sm" htmlFor="komoditas">
            Komoditas
          </FormLabel>
          <Select
            id="komoditas"
            placeholder="Pilih Jenis Komoditas"
            {...register('komoditas')}
          >
            <option value="Cengkeh Basah">Cengkeh Basah</option>
            <option value="Cengkeh Kering">Cengkeh Kering</option>
          </Select>
          <FormErrorMessage>
            {errors.komoditas && errors.komoditas.message}
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
            <option value="Kg">Kg</option>
            <option value="Ltr">Ltr</option>
          </Select>
          <FormErrorMessage>
            {errors.satuan && errors.satuan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.harga)}>
          <FormLabel fontSize="sm" htmlFor="harga">
            Harga
          </FormLabel>
          <Controller
            control={control}
            name="harga"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                id="harga"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                disabled={false}
              />
            )}
          />
          <FormErrorMessage>
            {errors.harga && errors.harga.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.berat_min)}>
          <FormLabel fontSize="sm" htmlFor="berat_min">
            Berat Min.
          </FormLabel>
          <Controller
            control={control}
            name="berat_min"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                id="berat_min"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                disabled={false}
              />
            )}
          />
          <FormErrorMessage>
            {errors.berat_min && errors.berat_min.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.berat_max)}>
          <FormLabel fontSize="sm" htmlFor="berat_max">
            Berat Maks.
          </FormLabel>
          <Controller
            control={control}
            name="berat_max"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                id="berat_max"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                disabled={false}
              />
            )}
          />
          <FormErrorMessage>
            {errors.berat_max && errors.berat_max.message}
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
          {`${initialValues ? 'Perbarui' : 'Simpan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormPenawaran;
