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

import { useForm, FieldValues, Controller } from 'react-hook-form';
import { defaultValues, schemaHasilPengeringan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TAddPengeringan, TUpdatePengeringan } from './schema';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import ReactDatePicker from 'react-datepicker';
import { useGetTim } from '../../../hooks/useTeam.hook';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TAddPengeringan | TUpdatePengeringan) => void;
  initialValues: TUpdatePengeringan | undefined | boolean;
};

const FormHasilPengeringan = ({
  isLoading,
  onSave: handleSave,
  onClose: handleCloseModal,
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
    resolver: zodResolver(schemaHasilPengeringan),
  });

  const getTim = useGetTim();
  const teams = getTim.data?.data?.data?.tim;

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { tim, berat, volume, tanggal, catatan, upah } = initialValues;
      setValue('tim', tim);
      setValue('berat', berat);
      setValue('volume', volume);
      setValue('tanggal', tanggal);
      setValue('catatan', catatan);
      setValue('upah', upah);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TUpdatePengeringan).id,
        ...data,
      } as TUpdatePengeringan);
    } else {
      handleSave(data as TAddPengeringan);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.tim)}>
          <FormLabel fontSize="sm" htmlFor="tim">
            Tim
          </FormLabel>
          <Select id="tim" placeholder="Pilih Tim" {...register('tim')}>
            {teams?.map((team: GetTim) => (
              <option key={team.id} value={team.id}>
                {team.nama_tim}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.tim && errors.tim.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.berat)}>
          <FormLabel fontSize="sm" htmlFor="berat">
            Berat (Kg)
          </FormLabel>
          <Controller
            control={control}
            name="berat"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="berat"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                disabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.berat && errors.berat.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume)}>
          <FormLabel fontSize="sm" htmlFor="volume">
            Volume (Ltr)
          </FormLabel>
          <Controller
            control={control}
            name="volume"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="volume"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                disabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.volume && errors.volume.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="waktu_mulai">
            Waktu Selesai
          </FormLabel>
          <Controller
            control={control}
            name="tanggal"
            render={({ field: { onChange, value, onBlur } }) => (
              <ReactDatePicker
                readOnly={isLoading}
                onChange={onChange}
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
                disabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.upah && errors.upah.message}
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

export default FormHasilPengeringan;
