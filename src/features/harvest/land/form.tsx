import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TAddLahan,
  TUpdateLahan,
  defaultValues,
  schemaLahan,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProvinsi, useKabupaten } from '../../../hooks/useLocation.hook';
import { STATUS_LAHAN } from '../../../model/status-lahan.model';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TAddLahan | TUpdateLahan) => void;
  initialValues: TUpdateLahan | undefined | boolean;
};

const FormLahan = ({
  onClose: handleCloseModal,
  isLoading,
  onSave: handleSave,
  initialValues,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaLahan),
  });

  const getProvinsi = useProvinsi();
  const getKabupaten = useKabupaten(watch('provinsi').trim());

  const provinsi = getProvinsi.data?.data?.data?.lokasi?.sub_lokasi ?? [];
  const kabupaten = getKabupaten?.data?.data?.data?.lokasi?.sub_lokasi ?? [];

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama, provinsi, status_lahan, luas_lahan } = initialValues;
      setValue('nama', nama);
      setValue('status_lahan', status_lahan);
      setValue('luas_lahan', luas_lahan);
      setValue('provinsi', provinsi);
    }
  }, []);

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      getKabupaten.isSuccess && setValue('kabupaten', initialValues.kabupaten);
    }
  }, [getKabupaten.isSuccess]);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TUpdateLahan).id,
        ...data,
      } as TUpdateLahan);
    } else {
      handleSave({ ...(data as TAddLahan) });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.nama)}>
          <FormLabel fontSize="sm" htmlFor="nama">
            Nama
          </FormLabel>
          <Input
            id="nama"
            placeholder="Nama"
            isDisabled={isLoading}
            {...register('nama')}
          />
          <FormErrorMessage>
            {errors.nama && errors.nama.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.provinsi)}>
          <FormLabel fontSize="sm" htmlFor="provinsi">
            Provinsi
          </FormLabel>
          <Select
            id="provinsi"
            placeholder="Pilih Provinsi"
            isDisabled={isLoading}
            {...register('provinsi')}
          >
            {provinsi.map((provinsi: LocationProps) => {
              return (
                <option key={provinsi.id_lokasi} value={provinsi.id_lokasi}>
                  {provinsi.nama_lokasi}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.provinsi && errors.provinsi.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.kabupaten)}>
          <FormLabel fontSize="sm" htmlFor="kabupaten">
            Kabupaten
          </FormLabel>
          <Select
            id="kabupaten"
            placeholder="Pilih Kabupaten"
            isDisabled={isLoading}
            {...register('kabupaten')}
          >
            {kabupaten.map((kabupaten: LocationProps) => (
              <option key={kabupaten.id_lokasi} value={kabupaten.id_lokasi}>
                {kabupaten.nama_lokasi}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.kabupaten && errors.kabupaten.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.status_lahan)}>
          <FormLabel fontSize="sm" htmlFor="status_lahan">
            Status lahan
          </FormLabel>

          <Select
            id="status_lahan"
            placeholder="Pilih Status Lahan"
            isDisabled={isLoading}
            {...register('status_lahan')}
          >
            {STATUS_LAHAN.map((lahan: OptionProps) => (
              <option key={lahan.value} value={lahan.value}>
                {lahan.label}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.status_lahan && errors.status_lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.luas_lahan)}>
          <FormLabel fontSize="sm" htmlFor="luas_lahan">
            Luas lahan (m<Text as="sup">2</Text>)
          </FormLabel>
          <Controller
            control={control}
            name="luas_lahan"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="luas_lahan"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                isDisabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.luas_lahan && errors.luas_lahan.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack justify="end" gap={3} marginTop={4}>
        <Button
          type="button"
          variant="ghost"
          onClick={handleCloseModal}
          isDisabled={isLoading}
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

export default FormLahan;
