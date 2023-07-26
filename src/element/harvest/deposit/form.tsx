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
import { TUpdate } from './types';
import { useEffect } from 'react';

type Props = {
  onClose: () => void;
  initialValues: TUpdate | undefined | boolean;
};

const FormSetoran = ({ onClose: handleCloseModal, initialValues }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schemaSetoran),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { lahan, volume, upah, id_buruh, tanggal, catatan } = initialValues;

      setValue('lahan', lahan);
      setValue('volume', volume);
      setValue('upah', upah);
      setValue('id_buruh', id_buruh);
      setValue('tanggal', tanggal);
      setValue('catatan', catatan);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (initialValues) {
      console.log('update', data);
      handleCloseModal();
    } else {
      console.log('add', data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.lahan)}>
          <FormLabel fontSize="sm" htmlFor="lahan">Lahan</FormLabel>
          <Select id="lahan" placeholder="Pilih Lahan" {...register('lahan')}>
            <option value="Cengkeh Malino">Cengkeh Malino</option>
          </Select>
          <FormErrorMessage>
            {errors.lahan && errors.lahan.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.volume)}>
          <FormLabel fontSize="sm" htmlFor="volume">Volume</FormLabel>
          <Input id="volume" placeholder="Volume" {...register('volume')} />
          <FormErrorMessage>
            {errors.volume && errors.volume.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.upah)}>
          <FormLabel fontSize="sm" htmlFor="upah">Upah</FormLabel>
          <Input id="upah" placeholder="Upah" {...register('upah')} />
          <FormErrorMessage>
            {errors.upah && errors.upah.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.id_buruh)}>
          <FormLabel fontSize="sm" htmlFor="id_buruh">Kode Buruh</FormLabel>
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
          <FormLabel fontSize="sm" htmlFor="tanggal">Tanggal</FormLabel>
          <Input id="tanggal" placeholder="Tanggal" {...register('tanggal')} />
          <FormErrorMessage>
            {errors.tanggal && errors.tanggal.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.catatan)}>
          <FormLabel fontSize="sm" htmlFor="catatan">Catatan</FormLabel>
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
        <Button onClick={handleCloseModal} type="button" variant="ghost" >
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {`${initialValues ? 'Perbarui' : 'Simpan'}`}
        </Button>
      </HStack>
    </form>
  );
};

export default FormSetoran;
