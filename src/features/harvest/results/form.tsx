import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
  Input,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { defaultValues, harvestResultSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useGetLands } from '../../../hooks/useLand.hook';
import { selectLahanAdapter } from './helper';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import {
  AddHarvestResult,
  UpdateHarvestResult,
} from '../../../types/HarvestResult';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: AddHarvestResult | UpdateHarvestResult) => void;
  initialValues: UpdateHarvestResult | undefined | boolean;
};

const HarvestResultForm = ({
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
    resolver: zodResolver(harvestResultSchema),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { lahan, berat, volume, tanggal, catatan } = initialValues;
      setValue('lahan', lahan);
      setValue('berat', berat);
      setValue('volume', volume);
      setValue('tanggal', new Date(tanggal));
      setValue('catatan', catatan);
    }
  }, []);

  const getLahan = useGetLands();
  const lahan = selectLahanAdapter(getLahan?.data?.data?.lahan || []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as UpdateHarvestResult).id,
        ...data,
      } as UpdateHarvestResult);
    } else {
      handleSave(data as AddHarvestResult);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.lahan)}>
          <FormLabel fontSize="sm" htmlFor="lahan">
            Lahan
          </FormLabel>
          <Select
            id="lahan"
            placeholder="Pilih Lahan"
            isDisabled={isLoading}
            {...register('lahan')}
          >
            {lahan?.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.lahan && errors.lahan.message}
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
          <FormLabel fontSize="sm" htmlFor="tanggal">
            Tanggal
          </FormLabel>
          <Controller
            control={control}
            name="tanggal"
            render={({ field: { onChange, value, onBlur } }) => (
              <DatePicker
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

export default HarvestResultForm;
