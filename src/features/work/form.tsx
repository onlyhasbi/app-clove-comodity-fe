import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  VStack,
  HStack,
  Textarea,
} from '@chakra-ui/react';

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TAddPekerjaan,
  TUpdatePekerjaan,
  defaultValues,
  workSchema,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SATUAN, PEKERJAAN } from '../../model/penawaran.model';
import { NumericFormat, NumberFormatValues } from 'react-number-format';

type Props = {
  isLoading: boolean;
  initialValues: TUpdatePekerjaan | undefined | boolean;
  onReset: () => void;
  onSave: (payload: TAddPekerjaan | TUpdatePekerjaan) => void;
};

const FormTable = ({
  isLoading,
  onSave,
  onReset: handleReset,
  initialValues,
}: Props) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(workSchema),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama_pekerjaan, upah, satuan, catatan } = initialValues;
      setValue('nama_pekerjaan', nama_pekerjaan);
      setValue('upah', upah);
      setValue('satuan', satuan);
      setValue('catatan', catatan);
    }
  }, [initialValues]);

  const onSubmit = (payload: FieldValues) => {
    if (initialValues && typeof initialValues === 'object') {
      onSave({ id: initialValues.id, ...(payload as TAddPekerjaan) });
    } else {
      onSave(payload as TAddPekerjaan);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        gap={{ lg: 5, base: 4 }}
      >
        <VStack gap={4}>
          <FormControl isInvalid={Boolean(errors.nama_pekerjaan)}>
            <FormLabel fontSize="sm" htmlFor="nama_pekerjaan">
              Nama Pekerjaan
            </FormLabel>
            <Select
              id="nama_pekerjaan"
              placeholder="Pilih Pekerjaan"
              isDisabled={isLoading}
              {...register('nama_pekerjaan')}
            >
              {PEKERJAAN.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.nama_pekerjaan && errors.nama_pekerjaan.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.upah)}>
            <FormLabel fontSize="sm" htmlFor="upah">
              Upah
            </FormLabel>
            <Controller
              control={control}
              name="upah"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  getInputRef={ref}
                  as={NumericFormat}
                  onValueChange={(event: NumberFormatValues) =>
                    onChange(event.floatValue)
                  }
                  onBlur={onBlur}
                  value={value}
                  id="upah"
                  defaultValue={0}
                  decimalSeparator=","
                  thousandSeparator="."
                  isDisabled={isLoading}
                />
              )}
            />
            <FormErrorMessage>
              {errors.upah && errors.upah.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.satuan)}>
            <FormLabel fontSize="sm" htmlFor="satuan">
              Satuan
            </FormLabel>
            <Select
              id="satuan"
              placeholder="Pilih Satuan"
              isDisabled={isLoading}
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
        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel fontSize="sm" htmlFor="catatan">
            Catatan
          </FormLabel>
          <Textarea
            id="catatan"
            rows={8}
            placeholder="Catatan"
            isDisabled={isLoading}
            {...register('catatan')}
          />
          <FormErrorMessage>
            {errors.catatan && errors.catatan.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
      <HStack justify="end" gap={3} marginTop={6}>
        <Button
          isDisabled={isLoading}
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
          {`${initialValues ? 'Perbarui' : 'Tambahkan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormTable;
