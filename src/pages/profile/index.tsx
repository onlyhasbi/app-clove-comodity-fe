import { Stack, Box, Text } from '@chakra-ui/react';
import ProfileForm from '../../element/profile/form';
import SocialMedia from '../../element/profile/social-media';
import { useGetProfile } from '../../hooks/useProfile.hook';

const Profile = () => {
  const getProfile = useGetProfile();

  const handleSave = (data: any) => {
    console.log(data);
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
          color="brand.100"
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

      <ProfileForm
        onSave={handleSave}
        initialValues={
          getProfile.isSuccess ? getProfile?.data?.data?.data?.user : []
        }
      />
      <SocialMedia />
    </Stack>
  );
};

export default Profile;
