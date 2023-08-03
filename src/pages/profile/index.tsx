import { Stack, Box, Text, SkeletonText } from '@chakra-ui/react';
import ProfileForm from '../../element/profile/form';
import SocialMedia from '../../element/profile/social-media';
import { useGetProfile, useUpdateProfile } from '../../hooks/useProfile.hook';

const Profile = () => {
  const getProfile = useGetProfile();
  const updateProfile = useUpdateProfile();

  const handleSave = (payload: PayloadProps) => {
    const defaultPayload = {
      id: payload.id,
      jenis_pengguna: payload.jenis_pengguna,
      nomor_telpon: payload.telepon,
      nama: payload.nama,
      alamat: payload.kabupaten,
    };
    updateProfile.mutate(defaultPayload);
  };

  return (
    <Stack
      direction="column"
      paddingX={10}
      marginTop={5}
      paddingBottom="5rem"
      spacing="2rem"
    >
      <Box w="full">
        <Text
          as="h2"
          fontSize="xl"
          w="full"
          fontWeight={700}
          letterSpacing="-0.01rem"
          textAlign="left"
          color="green.600"
        >
          Lengkapi Profilmu
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Bantu orang lain mengenali dan mengenal anda
        </Text>
      </Box>

      {getProfile.isLoading ? (
        <SkeletonText spacing={6} noOfLines={8} skeletonHeight={3} />
      ) : (
        <ProfileForm
          onSave={handleSave}
          isLoading={updateProfile.isLoading}
          initialValues={
            getProfile.isSuccess ? getProfile?.data?.data?.data?.user : []
          }
        />
      )}
      <SocialMedia />
    </Stack>
  );
};

export default Profile;
