import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  GridItem,
  Button,
  Grid,
  Select,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { TSchemaProfile, defaultValues, schemaProfile } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProvinsi, useKabupaten } from '../../hooks/useLocation.hook';
import { JENIS_PENGGUNA } from '../../model/jenis-pengguna.model';
import { getProvince } from '../../utils';

type Props = {
  initialValues: initialProfileProps;
  isLoading: boolean;
  onSave: (payload: TSchemaProfile) => void;
};

const ProfileForm = ({ initialValues, isLoading, onSave }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaProfile),
  });

  const getProvinsi = useProvinsi();
  const getKabupaten = useKabupaten(watch('provinsi').trim());

  const provinsi = getProvinsi.data?.data?.data?.lokasi?.sub_lokasi ?? [];
  const kabupaten = getKabupaten?.data?.data?.data?.lokasi?.sub_lokasi ?? [];

  const onSubmit = (data: FieldValues) => {
    onSave(data as TSchemaProfile);
  };

  useEffect(() => {
    const provinsi = initialValues.alamat && getProvince(initialValues.alamat);
    setValue('jenis_pengguna', initialValues.jenis_pengguna);
    setValue('nama', initialValues.nama);
    provinsi && setValue('provinsi', provinsi);
    setValue('telepon', initialValues.nomor_telpon);
  }, [initialValues, provinsi]);

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      getKabupaten.isSuccess && setValue('kabupaten', initialValues.alamat);
    }
  }, [getProvinsi.isSuccess, getKabupaten.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        gap={{ lg: 5, base: 4 }}
      >
        <FormControl isInvalid={Boolean(errors.jenis_pengguna)}>
          <FormLabel fontSize="sm" htmlFor="jenis_pengguna">
            Jenis Pengguna
          </FormLabel>

          <Select
            id="jenis_pengguna"
            placeholder="Pilih Jenis Pengguna"
            {...register('jenis_pengguna')}
          >
            {JENIS_PENGGUNA.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.jenis_pengguna && errors.jenis_pengguna.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.nama)}>
          <FormLabel fontSize="sm" htmlFor="nama">
            Nama
          </FormLabel>
          <Input id="nama" placeholder="Nama" {...register('nama')} />
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

        <GridItem colSpan={2}>
          <FormControl isInvalid={Boolean(errors.telepon)}>
            <FormLabel fontSize="sm" htmlFor="telepon">
              Telepon
            </FormLabel>
            <Input
              id="telepon"
              placeholder="Telepon"
              {...register('telepon')}
            />
            <FormErrorMessage>
              {errors.telepon && errors.telepon.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
      <Button
        type="submit"
        colorScheme="green"
        isLoading={isLoading}
        loadingText="Menyimpan..."
        spinnerPlacement="start"
        marginTop={6}
      >
        {`${initialValues ? 'Perbarui' : 'Simpan'}`}
      </Button>
    </form>
  );
};

export default ProfileForm;
