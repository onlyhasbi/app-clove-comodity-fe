import { Circle, Flex, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex w="full" justifyContent="end" marginTop={8} paddingRight={12}>
      <Flex gap={4}>
        <Text>User Guest</Text>
        <Circle size={25} bg="brand.100">
          <Text fontSize={16} fontWeight="bold" color="white">
            G
          </Text>
        </Circle>
      </Flex>
    </Flex>
  );
};

export default Header;
