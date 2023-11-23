import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  HStack,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TAddPenawaran,
  TUpdatePenawaran,
  defaultValues,
  offerSchema,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import {
  JENIS_KOMODITAS,
  JENIS_PENAWARAN,
  SATUAN,
} from '../../model/penawaran.model';

type Props = {
  initialValues: TUpdatePenawaran | undefined | boolean;
  isLoading: boolean;
  onReset: () => void;
  onSave: (payload: TAddPenawaran | TUpdatePenawaran) => void;
};

const OfferForm = ({
  isLoading,
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
    resolver: zodResolver(offerSchema),
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
        catatan,
      } = initialValues;
      setValue('jenis_penawaran', jenis_penawaran);
      setValue('komoditas', komoditas);
      setValue('satuan', satuan);
      setValue('harga', harga);
      setValue('berat_min', berat_min);
      setValue('berat_max', berat_max);
      setValue('catatan', catatan);
    }
  }, [initialValues]);

  const onSubmit = (data: FieldValues) => {
    if (initialValues && typeof initialValues === 'object') {
      onSave({
        id: initialValues.id,
        ...(data as TAddPenawaran),
      });
    } else {
      onSave(data as TAddPenawaran);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(3,1fr)', base: '1fr' }}
        gap={{ lg: 8, base: 4 }}
      >
        <VStack gap={4}>
          <FormControl isInvalid={Boolean(errors.jenis_penawaran)}>
            <FormLabel fontSize="sm" htmlFor="jenis_penawaran">
              Jenis Penawaran
            </FormLabel>
            <Select
              disabled={isLoading}
              id="jenis_penawaran"
              placeholder="Pilih Jenis Penawaran"
              {...register('jenis_penawaran')}
            >
              {JENIS_PENAWARAN.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
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
              disabled={isLoading}
              placeholder="Pilih Jenis Komoditas"
              {...register('komoditas')}
            >
              {JENIS_KOMODITAS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
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
              disabled={isLoading}
              placeholder="Pilih Satuan"
              {...register('satuan')}
            >
              {SATUAN.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.satuan && errors.satuan.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack gap={4}>
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
                  disabled={isLoading}
                  as={NumericFormat}
                  onValueChange={(event: NumberFormatValues) =>
                    onChange(event.floatValue)
                  }
                  onBlur={onBlur}
                  value={value}
                  id="harga"
                  defaultValue={0}
                  decimalSeparator=","
                  thousandSeparator="."
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
                  onValueChange={(event: NumberFormatValues) =>
                    onChange(event.floatValue)
                  }
                  onBlur={onBlur}
                  value={value}
                  id="berat_min"
                  defaultValue={0}
                  decimalSeparator=","
                  thousandSeparator="."
                  disabled={isLoading}
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
                  onValueChange={(event: NumberFormatValues) =>
                    onChange(event.floatValue)
                  }
                  onBlur={onBlur}
                  value={value}
                  id="berat_max"
                  defaultValue={0}
                  decimalSeparator=","
                  thousandSeparator="."
                  disabled={isLoading}
                />
              )}
            />
            <FormErrorMessage>
              {errors.berat_max && errors.berat_max.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack gap={4}>
          <FormControl isInvalid={Boolean(errors.catatan)}>
            <FormLabel fontSize="sm" htmlFor="catatan">
              Catatan
            </FormLabel>
            <Textarea
              id="catatan"
              rows={8}
              placeholder="Catatan"
              {...register('catatan')}
              disabled={isLoading}
            />
            <FormErrorMessage>
              {errors.catatan && errors.catatan.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
      </Grid>
      <HStack justify="end" gap={3} marginTop={6}>
        <Button
          disabled={isLoading}
          onClick={() => {
            reset();
            handleReset();
          }}
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

export default OfferForm;
