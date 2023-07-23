import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Button,
  Grid,
  HStack,
  Select,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaProfile } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ProfileForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaProfile),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridTemplateColumns="repeat(2,1fr)" gap={6}>
          <FormControl isInvalid={Boolean(errors.jenis_pengguna)}>
            <FormLabel htmlFor="jenis_pengguna">Jenis Pengguna</FormLabel>
            <Input
              id="jenis_pengguna"
              placeholder="Jenis Pengguna"
              {...register('jenis_pengguna')}
            />
            <FormErrorMessage>
              {errors.jenis_pengguna && errors.jenis_pengguna.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.nama)}>
            <FormLabel htmlFor="nama">Nama</FormLabel>
            <Input id="nama" placeholder="Nama" {...register('nama')} />
            <FormErrorMessage>
              {errors.nama && errors.nama.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.provinsi)}>
            <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
            <Select
              id="provinsi"
              placeholder="Pilih Provinsi"
              {...register('provinsi')}
            >
              <option value="option1">Sulawesi Selatan</option>
            </Select>
            <FormErrorMessage>
              {errors.provinsi && errors.provinsi.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.kabupaten)}>
            <FormLabel htmlFor="kabupaten">Kabupaten</FormLabel>
            <Select
              id="kabupaten"
              placeholder="Pilih Kabupaten"
              {...register('kabupaten')}
            >
              <option value="option1">Makassar</option>
            </Select>
            <FormErrorMessage>
              {errors.kabupaten && errors.kabupaten.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.alamat)}>
            <FormLabel htmlFor="alamat">Alamat</FormLabel>
            <Textarea
              id="alamat"
              rows={3}
              placeholder="Alamat"
              {...register('alamat')}
            />
            <FormErrorMessage>
              {errors.alamat && errors.alamat.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.phone)}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input id="phone" placeholder="Phone" {...register('phone')} />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>
        <HStack gap={3} marginTop={6}>
          <Button type="submit" bg="brand.100" color="white">
            Simpan
          </Button>
          <Button type="button" variant="ghost">
            Batal
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default ProfileForm;
