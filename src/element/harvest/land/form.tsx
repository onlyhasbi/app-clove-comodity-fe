import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TSchemaLahan,
  TSchemaUpdateLahan,
  defaultValues,
  schemaLahan,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProvinsi, useKabupaten } from '../../../hooks/useLocation.hook';
import { STATUS_LAHAN } from '../../../model/status-lahan.model';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TSchemaLahan | TSchemaUpdateLahan) => void;
  initialValues: TSchemaUpdateLahan | undefined | boolean;
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
      setValue('luas_lahan', String(luas_lahan));
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
        id: (initialValues as TSchemaUpdateLahan).id,
        ...data,
      } as TSchemaUpdateLahan);
    } else {
      handleSave(data as TSchemaLahan);
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
            {...register('nama')}
            disabled={isLoading}
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
            {...register('provinsi')}
            disabled={isLoading}
          >
            {provinsi.map((provinsi: any) => {
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
            {...register('kabupaten')}
            disabled={isLoading}
          >
            {kabupaten.map((kabupaten: any) => (
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
            {...register('status_lahan')}
            disabled={isLoading}
          >
            {STATUS_LAHAN.map((lahan) => (
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
            Luas lahan
          </FormLabel>
          <Controller
            control={control}
            name="luas_lahan"
            render={({ field: { ref, ...restField } }) => (
              <NumberInput
                placeholder="Luas Lahan"
                defaultValue={0}
                {...restField}
              >
                <NumberInputField
                  id="luas_lahan"
                  ref={ref}
                  name={restField.name}
                  disabled={isLoading}
                />
              </NumberInput>
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
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="primary"
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
