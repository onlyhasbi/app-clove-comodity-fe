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

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TSchemaPenjualan,
  TSchemaUpdatePenjualan,
  defaultValues,
  schemaPenjualan,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { JENIS_KOMODITAS } from '../../../model/penawaran.model';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import ReactDatePicker from 'react-datepicker';

type Props = {
  isLoading: boolean;
  onSave: (payload: TSchemaPenjualan | TSchemaUpdatePenjualan) => void;
  onClose: () => void;
  initialValues: TSchemaUpdatePenjualan | undefined | boolean;
};

const FormPenjualan = ({
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
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaPenjualan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const {
        id_pembeli,
        jenis_komoditas,
        berat_kg,
        harga_rp,
        tanggal,
        catatan,
      } = initialValues;

      setValue('id_pembeli', id_pembeli);
      setValue('jenis_komoditas', jenis_komoditas);
      setValue('berat_kg', berat_kg);
      setValue('harga_rp', harga_rp);
      setValue('tanggal', new Date(tanggal));
      setValue('catatan', catatan);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TSchemaUpdatePenjualan).id,
        ...data,
      } as TSchemaUpdatePenjualan);
    } else {
      handleSave(data as TSchemaPenjualan);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.id_pembeli)}>
          <FormLabel fontSize="sm" htmlFor="id_pembeli">
            ID Pembeli
          </FormLabel>
          <Input
            id="id_pembeli"
            placeholder="ID Penjual"
            {...register('id_pembeli')}
            disabled={isLoading}
          />
          <FormErrorMessage>
            {errors.id_pembeli && errors.id_pembeli.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.jenis_komoditas)}>
          <FormLabel fontSize="sm" htmlFor="jenis_komoditas">
            Komoditas
          </FormLabel>
          <Select
            id="jenis_komoditas"
            placeholder="Pilih Jenis Komoditas"
            {...register('jenis_komoditas')}
            disabled={isLoading}
          >
            {JENIS_KOMODITAS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.jenis_komoditas && errors.jenis_komoditas.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat_kg)}>
          <FormLabel fontSize="sm" htmlFor="berat_kg">
            Berat (Kg)
          </FormLabel>
          <Controller
            control={control}
            name="berat_kg"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                disabled={isLoading}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.value)
                }
                onBlur={onBlur}
                value={value}
                id="berat_kg"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
              />
            )}
          />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.harga_rp)}>
          <FormLabel fontSize="sm" htmlFor="harga_rp">
            Harga (Rp)
          </FormLabel>
          <Controller
            control={control}
            name="harga_rp"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                disabled={isLoading}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.value)
                }
                onBlur={onBlur}
                value={value}
                id="harga_rp"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
              />
            )}
          />
          <FormErrorMessage>
            {errors.harga_rp && errors.harga_rp.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="tanggal">
            Tanggal
          </FormLabel>
          <Controller
            control={control}
            name="tanggal"
            render={({ field: { onChange, value, onBlur } }) => (
              <ReactDatePicker
                onChange={onChange}
                readOnly={isLoading}
                onBlur={onBlur}
                selected={value}
                dateFormat="dd / MM / yyyy"
                disabled={isLoading}
              />
            )}
          />
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
        <Button
          onClick={handleCloseModal}
          type="button"
          variant="ghost"
          disabled={isLoading}
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

export default FormPenjualan;
