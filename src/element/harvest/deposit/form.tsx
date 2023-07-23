import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, schemaSetoran } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSetoran = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaSetoran),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.lahan)}>
          <FormLabel htmlFor="lahan">Lahan</FormLabel>
          <Select id="lahan" placeholder="Pilih Lahan" {...register('lahan')}>
            <option value="option1">Malino</option>
          </Select>
          <FormErrorMessage>
            {errors.lahan && errors.lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume)}>
          <FormLabel htmlFor="volume">Volume</FormLabel>
          <Input id="volume" placeholder="Volume" {...register('volume')} />
          <FormErrorMessage>
            {errors.volume && errors.volume.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.upah)}>
          <FormLabel htmlFor="upah">Upah</FormLabel>
          <Input id="upah" placeholder="Upah" {...register('upah')} />
          <FormErrorMessage>
            {errors.upah && errors.upah.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.id_buruh)}>
          <FormLabel htmlFor="id_buruh">Kode Buruh</FormLabel>
          <Input
            id="id_buruh"
            placeholder="Kode Buruh"
            {...register('id_buruh')}
          />
          <FormErrorMessage>
            {errors.id_buruh && errors.id_buruh.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.tanggal)}>
          <FormLabel htmlFor="tanggal">Tanggal</FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel htmlFor="catatan">Catatan</FormLabel>
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
        <Button type="button" variant="ghost">
          Batal
        </Button>
        <Button type="submit" bg="brand.100" color="white">
          Simpan
        </Button>
      </HStack>
    </form>
  );
};

export default FormSetoran;
