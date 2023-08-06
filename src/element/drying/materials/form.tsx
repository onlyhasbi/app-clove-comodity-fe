import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Textarea,
} from '@chakra-ui/react';

import { useForm, FieldValues, Controller } from 'react-hook-form';
import { defaultValues, schemaBahan } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { TSchemaBahan, TSchemaUpdateBahan } from './schema';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import ReactDatePicker from 'react-datepicker';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TSchemaBahan | TSchemaUpdateBahan) => void;
  initialValues: TSchemaUpdateBahan | undefined | boolean;
};

const FormBahan = ({
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
    resolver: zodResolver(schemaBahan),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { berat_kg, volume_liter, waktu_mulai, catatan } = initialValues;
      setValue('berat_kg', berat_kg);
      setValue('volume_liter', volume_liter);
      setValue('waktu_mulai', waktu_mulai);
      setValue('catatan', catatan);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TSchemaUpdateBahan).id,
        ...data,
      } as TSchemaUpdateBahan);
    } else {
      handleSave(data as TSchemaBahan);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
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
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="berat_kg"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                isDisabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.berat_kg && errors.berat_kg.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume_liter)}>
          <FormLabel fontSize="sm" htmlFor="volume_liter">
            Volume (Ltr)
          </FormLabel>
          <Controller
            control={control}
            name="volume_liter"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="volume_liter"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                isDisabled={isLoading}
              />
            )}
          />
          <FormErrorMessage>
            {errors.volume_liter && errors.volume_liter.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.waktu_mulai)}>
          <FormLabel fontSize="sm" htmlFor="waktu_mulai">
            Waktu Mulai
          </FormLabel>
          <Controller
            control={control}
            name="waktu_mulai"
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
            {errors.waktu_mulai && errors.waktu_mulai.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel fontSize="sm" htmlFor="catatan">
            Catatan
          </FormLabel>
          <Textarea
            id="catatan"
            isDisabled={isLoading}
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

export default FormBahan;
