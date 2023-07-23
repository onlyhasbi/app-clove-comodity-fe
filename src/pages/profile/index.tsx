import { Stack } from '@chakra-ui/react';
import ProfileForm from '../../element/profile/form';
import SocialMedia from '../../element/profile/social-media';

const Profile = () => {
  return (
    <Stack
      direction="column"
      paddingX={10}
      paddingBottom="5rem"
      marginTop={5}
      spacing="3.5rem"
    >
      <ProfileForm />
      <SocialMedia />
    </Stack>
  );
};

export default Profile;
