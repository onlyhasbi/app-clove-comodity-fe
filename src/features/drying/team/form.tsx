import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react';

import { useForm, FieldValues } from 'react-hook-form';
import { defaultValues, teamSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useAllUserBuruh } from '../../../hooks/useUser.hook';
import { UserBuruh } from '../../../types/User';
import { AddTeam, UpdateTeam } from '../../../types/Team';

type Props = {
  onClose: () => void;
  isLoading?: boolean;
  onSave: (payload: AddTeam | UpdateTeam) => void;
  initialValues: UpdateTeam | undefined | boolean;
};

const TeamForm = ({
  isLoading,
  onSave: handleSave,
  onClose: handleCloseModal,
  initialValues,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(teamSchema),
  });

  useEffect(() => {
    if (initialValues && typeof initialValues === 'object') {
      const { nama_tim, ketua_tim } = initialValues;
      setValue('nama_tim', nama_tim);
      setValue('ketua_tim', ketua_tim);
    }
  }, []);

  const allUserBuruh = useAllUserBuruh();
  const buruh = allUserBuruh?.data?.data?.user;

  const onSubmit = (payload: FieldValues) => {
    if (initialValues) {
      handleSave({
        id: (initialValues as UpdateTeam).id,
        ...payload,
      } as UpdateTeam);
    } else {
      handleSave(payload as AddTeam);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <FormControl isInvalid={Boolean(errors.nama_tim)}>
          <FormLabel fontSize="sm" htmlFor="nama_tim">
            Nama
          </FormLabel>
          <Input
            id="nama_tim"
            placeholder="Nama Tim"
            isDisabled={isLoading}
            {...register('nama_tim')}
          />
          <FormErrorMessage>
            {errors.nama_tim && errors.nama_tim.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.ketua_tim)}>
          <FormLabel fontSize="sm" htmlFor="ketua_tim">
            Ketua
          </FormLabel>

          <Select
            id="ketua_tim"
            placeholder="Pilih Ketua Tim"
            isDisabled={isLoading}
            {...register('ketua_tim')}
          >
            {buruh?.map((item: UserBuruh) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.ketua_tim && errors.ketua_tim.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack justify="end" gap={3} marginTop={4}>
        <Button
          isDisabled={isLoading}
          onClick={handleCloseModal}
          type="button"
          variant="ghost"
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

export default TeamForm;
