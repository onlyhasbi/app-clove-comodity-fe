import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  FormLabel,
  Input,
  Grid,
  Button,
  Checkbox,
  Text,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { JENIS_PENGGUNA } from '../../model/jenis-pengguna.model';
import { TSchemaRegister, defaultValues, registerSchema } from './schema';
import { useForm, FieldValues } from 'react-hook-form';
import { useProvinsi, useKabupaten } from '../../hooks/useLocation.hook';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostProfile } from '../../hooks/useProfile.hook';
import { useNavigate } from 'react-router-dom';
import { LocationProps } from '../../types/Location';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSchemaRegister>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const [show, toggle] = useReducer((prev) => !prev, false);
  const navigate = useNavigate();

  const profile = usePostProfile();
  const { isSuccess } = profile;

  const getProvinsi = useProvinsi();
  const getKabupaten = useKabupaten(watch('provinsi').trim());

  const provinsi = getProvinsi.data?.data?.lokasi?.sub_lokasi ?? [];
  const kabupaten = getKabupaten?.data?.data?.lokasi?.sub_lokasi ?? [];

  useEffect(() => {
    if (isSuccess) navigate('/signin', { replace: true });
  }, [isSuccess, navigate]);

  const onSubmit = (payload: FieldValues) => {
    const defaultPayload = {
      nomor_telpon: payload.telepon,
      jenis_pengguna: payload.jenis_pengguna,
      nama: payload.nama,
      sandi: payload.sandi,
      alamat: payload.kabupaten,
    };

    profile.mutate(defaultPayload);
  };

  return (
    <Box color="gray.700">
      <Box width="full" padding={4} pt={2}>
        <Text fontSize="3xl" fontWeight="bold">
          Daftar
        </Text>
        <Text fontSize="sm" color="gray.600">
          Cepat dan mudah.
        </Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
          padding={4}
          gap={4}
        >
          <FormControl isInvalid={Boolean(errors.nama)}>
            <FormLabel fontSize="sm" htmlFor="nama">
              Nama
            </FormLabel>
            <Input id="nama" placeholder="Nama" {...register('nama')} />
            <FormErrorMessage>
              {errors.nama && errors.nama.message}
            </FormErrorMessage>
          </FormControl>

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

          <FormControl isInvalid={Boolean(errors.sandi)}>
            <FormLabel color={'gray.600'}>Sandi</FormLabel>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                color={'gray.600'}
                placeholder="Kata sandi"
                {...register('sandi')}
              />
              <InputRightElement>
                <IconButton
                  aria-label="sandi toggle"
                  color="gray.600"
                  variant="ghost"
                  _hover={{ bg: 'none' }}
                  _active={{
                    bg: 'none',
                  }}
                  onClick={toggle}
                  icon={show ? <RiEyeFill /> : <RiEyeOffFill />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.sandi && errors.sandi.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>
        <Flex padding={4} justifyContent="space-between">
          <Checkbox value="setuju" defaultChecked={true}>
            <Text as="h4" fontSize="sm">
              saya setuju dengan ketentuan yang berlaku
            </Text>
          </Checkbox>
          <Button
            type="submit"
            colorScheme="green"
            isLoading={profile.isLoading}
            loadingText="Daftar..."
            spinnerPlacement="start"
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default SignUpForm;
