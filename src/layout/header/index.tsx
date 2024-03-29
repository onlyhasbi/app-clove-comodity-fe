import {
  Circle,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Stack,
  Divider,
  SkeletonText,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteToken } from '../../hooks/useAuth.hook';
import { useGetProfile } from '../../hooks/useProfile.hook';
import React from 'react';
import { getFirstCharacter } from "../../utils/getFirstCharacter";
import { capitalize } from "../../utils/capitalize";

const routes = [
  { path: '/profile', label: 'Profil' },
  { path: '/offer', label: 'Penawaran' },
  { path: '/work', label: 'Pekerjaan' },
];

const Header = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const path = location === '/' ? 'home' : location;

  const handleLogOut = () => {
    deleteToken(import.meta.env.VITE_TOKEN_NAME);
    navigate('/', { replace: true });
  };

  const profile = useGetProfile();
  const profileName =
    profile.isSuccess && capitalize(profile?.data?.data?.user?.nama);

  return (
    <Flex
      w="full"
      justifyContent={{ base: 'center', lg: 'end' }}
      marginTop={8}
      paddingRight={{ base: 0, lg: 12 }}
      cursor="pointer"
    >
      <Popover placement="top-start">
        <PopoverTrigger>
          <Stack
            direction={{ lg: 'row', base: 'column' }}
            alignItems={{ base: 'center' }}
            gap={4}
          >
            {profile.isLoading ? (
              <SkeletonText w="5rem" noOfLines={1} skeletonHeight="2" />
            ) : (
              <Text order={{ lg: '0', base: '1' }}>{profileName}</Text>
            )}
            <Circle size={{ lg: 35, base: 75 }} bg="green.600">
              <Text fontSize={12} fontWeight="bold" color="white">
                {getFirstCharacter(profileName)}
              </Text>
            </Circle>
          </Stack>
        </PopoverTrigger>
        <PopoverContent w="10rem" paddingY={2} _focus={{ boxShadow: 'none' }}>
          <PopoverBody>
            <VStack gap={2}>
              {routes.map((item) => {
                return (
                  <React.Fragment key={item.label}>
                    <Text
                      _hover={{
                        color: `${path !== item.path ? 'green.600' : ''}`,
                      }}
                      color={path === item.path ? 'green.600' : ''}
                      w="full"
                      paddingLeft={5}
                    >
                      <Link to={item.path} style={{ display: 'flex' }}>
                        {item.label}
                      </Link>
                    </Text>
                    <Divider />
                  </React.Fragment>
                );
              })}
              <Text
                _hover={{ color: 'green.600' }}
                w="full"
                paddingLeft={5}
                onClick={handleLogOut}
              >
                Keluar
              </Text>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Header;
