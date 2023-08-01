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
  NumberInput,
  NumberInputField,
  GridItem,
} from '@chakra-ui/react';

import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  TSchemaSetoran,
  TSchemaUpdateSetoran,
  defaultValues,
  schemaSetoran,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useGetLahan } from '../../../hooks/useLahan.hook';
import { NumericFormat } from 'react-number-format';
import { selectLahanAdapter } from './helper';
import ReactDatePicker from 'react-datepicker';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: TSchemaSetoran | TSchemaUpdateSetoran) => void;
  initialValues: TSchemaUpdateSetoran | undefined | boolean;
};

const FormSetoran = ({
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
    resolver: zodResolver(schemaSetoran),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { lahan, berat, volume, upah, id_buruh, tanggal, catatan } =
        initialValues;

      setValue('id_buruh', id_buruh);
      setValue('lahan', lahan);
      setValue('berat', berat);
      setValue('volume', volume);
      setValue('upah', upah);
      setValue('tanggal', new Date(tanggal));
      setValue('catatan', catatan);
    }
  }, []);

  const getLahan = useGetLahan();
  const lahan = selectLahanAdapter(getLahan?.data?.data?.data?.lahan || []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as TSchemaUpdateSetoran).id,
        ...data,
      } as TSchemaUpdateSetoran);
    } else {
      handleSave(data as TSchemaSetoran);
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
          <Input
            id="id_buruh"
            placeholder="Kode Buruh"
            {...register('id_buruh')}
            disabled={isLoading}
          />
          <FormErrorMessage>
            {errors.id_buruh && errors.id_buruh.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.lahan)}>
          <FormLabel fontSize="sm" htmlFor="lahan">
            Lahan
          </FormLabel>
          <Select
            id="lahan"
            placeholder="Pilih Lahan"
            {...register('lahan')}
            disabled={isLoading}
          >
            {lahan?.map((item: any) => {
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
            Berat
          </FormLabel>
          <Controller
            control={control}
            name="berat"
            render={({ field: { ref, ...restField } }) => (
              <NumberInput placeholder="Berat" defaultValue={0} {...restField}>
                <NumberInputField
                  id="berat"
                  ref={ref}
                  name={restField.name}
                  disabled={isLoading}
                />
              </NumberInput>
            )}
          />
          <FormErrorMessage>
            {errors.berat && errors.berat.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume)}>
          <FormLabel fontSize="sm" htmlFor="volume">
            Volume
          </FormLabel>
          <Controller
            control={control}
            name="volume"
            render={({ field: { ref, ...restField } }) => (
              <NumberInput placeholder="Volume" defaultValue={0} {...restField}>
                <NumberInputField
                  id="volume"
                  ref={ref}
                  name={restField.name}
                  disabled={isLoading}
                />
              </NumberInput>
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
            render={({ field: { onChange, onBlur, value, ref } }: any) => (
              <Input
                getInputRef={ref}
                as={NumericFormat}
                onChange={onChange}
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

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel fontSize="sm" htmlFor="tanggal">
            Tanggal
          </FormLabel>
          <Controller
            control={control}
            name="tanggal"
            render={({ field: { onChange, value, onBlur } }: any) => (
              <ReactDatePicker
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

        <GridItem colSpan={2}>
          <FormControl isInvalid={Boolean(errors.catatan)}>
            <FormLabel fontSize="sm" htmlFor="catatan">
              Catatan
            </FormLabel>
            <Textarea
              id="catatan"
              rows={3}
              placeholder="Catatan"
              {...register('catatan')}
              disabled={isLoading}
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

export default FormSetoran;
