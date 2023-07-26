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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const routes = [
  { path: 'profile', label: 'Profil' },
  { path: 'offer', label: 'Penawaran' },
  { path: 'work', label: 'Pekerjaan' },
  { path: '/', label: 'Keluar' },
];

const Header = () => {
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
            <Text order={{ lg: '0', base: '1' }}>User Guest</Text>
            <Circle size={{ lg: 25, base: 75 }} bg="brand.100">
              <Text fontSize={16} fontWeight="bold" color="white">
                G
              </Text>
            </Circle>
          </Stack>
        </PopoverTrigger>
        <PopoverContent w="10rem" paddingY={2} _focus={{ boxShadow: 'none' }}>
          <PopoverBody>
            <VStack gap={2}>
              {routes.map((item, index) => {
                return (
                  <React.Fragment key={item.label}>
                    <Text
                      _hover={{ color: 'brand.100' }}
                      w="full"
                      paddingLeft={5}
                    >
                      <Link to={item.path} style={{ display: 'flex' }}>
                        {item.label}
                      </Link>
                    </Text>
                    {index !== routes.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Header;
