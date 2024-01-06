import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { useGetTeam } from '../../../hooks/useTeam.hook';
import { AddDryResult, UpdateDryResult } from '../../../types/DryResult';
import { Team } from '../../../types/Team';
import { defaultValues, dryResultSchema } from './schema';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: AddDryResult | UpdateDryResult) => void;
  initialValues: UpdateDryResult | undefined | boolean;
};

const DryingResultForm = ({
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
    resolver: zodResolver(dryResultSchema),
  });

  const getTim = useGetTeam();
  const teams = getTim.data?.data?.tim;

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
        id: (initialValues as UpdateDryResult).id,
        ...data,
      } as UpdateDryResult);
    } else {
      handleSave(data as AddDryResult);
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
          <Select
            id="tim"
            isDisabled={isLoading}
            placeholder="Pilih Tim"
            {...register('tim')}
          >
            {teams?.map((team: Team) => (
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
            isDisabled={isLoading}
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

export default DryingResultForm;
