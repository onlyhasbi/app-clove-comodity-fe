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
  TAddPembelian,
  TUpdatePembelian,
  defaultValues,
  buySchema,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { COMODITY_TYPE } from '../../../model/offer.model';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import ReactDatePicker from 'react-datepicker';
import { useAllUserAcc } from '../../../hooks/useUser.hook';
import { UserBuruh } from '../../../types/User';

type Props = {
  isLoading: boolean;
  onSave: (payload: TAddPembelian | TUpdatePembelian) => void;
  onClose: () => void;
  initialValues: TUpdatePembelian | undefined | boolean;
};

const BuyForm = ({
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
    resolver: zodResolver(buySchema),
  });

  const allUserAcc = useAllUserAcc();
  const users = allUserAcc?.data?.data?.user;

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const {
        id_penjual,
        jenis_komoditas,
        berat_kg,
        harga_rp,
        tanggal,
        catatan,
      } = initialValues;

      setValue('id_penjual', id_penjual);
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
        id: (initialValues as TUpdatePembelian).id,
        ...data,
      } as TUpdatePembelian);
    } else {
      handleSave(data as TAddPembelian);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.id_penjual)}>
          <FormLabel fontSize="sm" htmlFor="id_penjual">
            Penjual
          </FormLabel>
          <Select
            id="id_penjual"
            placeholder="Pilih Pengguna"
            isDisabled={isLoading}
            {...register('id_penjual')}
          >
            {users?.map((item: UserBuruh) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.id_penjual && errors.id_penjual.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.jenis_komoditas)}>
          <FormLabel fontSize="sm" htmlFor="jenis_komoditas">
            Komoditas
          </FormLabel>
          <Select
            id="jenis_komoditas"
            placeholder="Pilih Jenis Komoditas"
            isDisabled={isLoading}
            {...register('jenis_komoditas')}
          >
            {COMODITY_TYPE.map((item) => (
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
                as={NumericFormat}
                onValueChange={(event: NumberFormatValues) =>
                  onChange(event.floatValue)
                }
                onBlur={onBlur}
                value={value}
                id="harga_rp"
                defaultValue={0}
                decimalSeparator=","
                thousandSeparator="."
                isDisabled={isLoading}
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

export default BuyForm;
