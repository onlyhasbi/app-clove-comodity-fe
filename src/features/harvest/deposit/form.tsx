import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Grid,
  HStack,
  GridItem,
} from '@chakra-ui/react';

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  defaultValues,
  depositSchema,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { selectLahanAdapter } from './helper';
import { useGetHasil } from '../../../hooks/useResult.hook';
import { useAllUserBuruh } from '../../../hooks/useUser.hook';
import ReactDatePicker from 'react-datepicker';
import { UserBuruh } from '../../../types/User';
import { AddDeposit, UpdateDeposit } from '@/types/Deposit';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: AddDeposit | UpdateDeposit) => void;
  initialValues: UpdateDeposit | undefined | boolean;
};

const DepositForm = ({
  onClose: handleCloseModal,
  isLoading,
  onSave: handleSave,
  initialValues,
}: Props) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(depositSchema),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { tanggal_panen, berat, volume, upah, id_buruh, tanggal, catatan } =
        initialValues;

      setValue('id_buruh', id_buruh);
      setValue('tanggal_panen', tanggal_panen);
      setValue('berat', berat);
      setValue('volume', volume);
      setValue('upah', upah);
      setValue('tanggal', new Date(tanggal));
      setValue('catatan', catatan);
    }
  }, []);

  const getHasil = useGetHasil();
  const hasil = selectLahanAdapter(getHasil?.data?.data?.hasil_panen || []);

  const allUserBuruh = useAllUserBuruh();
  const buruh = allUserBuruh?.data?.data?.user;

  const onSubmit = (payload: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as UpdateDeposit).id,
        ...payload,
      } as UpdateDeposit);
    } else {
      handleSave(payload as AddDeposit);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(2,1fr)" gap={4}>
        <FormControl isInvalid={Boolean(errors.id_buruh)}>
          <FormLabel fontSize="sm" htmlFor="id_buruh">
            Kode Buruh
          </FormLabel>
          <Select
            id="id_buruh"
            placeholder="Pilih Buruh"
            isDisabled={isLoading}
            {...register('id_buruh')}
          >
            {buruh?.map((item: UserBuruh) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.id_buruh && errors.id_buruh.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.tanggal_panen)}>
          <FormLabel fontSize="sm" htmlFor="lahan">
            Terakumulasi
          </FormLabel>
          <Select
            id="lahan"
            isDisabled={isLoading}
            placeholder="Pilih Hasil Panen"
            {...register('tanggal_panen')}
          >
            {hasil?.map((item: OptionProps) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.tanggal_panen && errors.tanggal_panen.message}
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

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="tanggal">
            Tanggal
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

        <GridItem colSpan={2}>
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
        </GridItem>
      </Grid>
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

export default DepositForm;
