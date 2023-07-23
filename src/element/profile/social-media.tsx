import {
  Circle,
  Divider,
  Grid,
  HStack,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';

const SocialMedia = () => {
  return (
    <VStack gap={5}>
      <Heading as="h2" size="lg" w="full" color="gray.700" marginY={2}>
        Social Media
      </Heading>
      <Grid gridTemplateColumns="repeat(2,1fr)" w="full" gap={6}>
        <HStack gap={4}>
          <Circle size="40px" bgColor="purple.600" color="white">
            F
          </Circle>
          <Input placeholder="Facebook" />
        </HStack>
        <HStack gap={4}>
          <Circle size="40px" bgColor="blue.600" color="white">
            T
          </Circle>
          <Input placeholder="Twitter" />
        </HStack>
        <HStack gap={4}>
          <Circle size="40px" bgColor="purple.600" color="white">
            L
          </Circle>
          <Input placeholder="Linked In" />
        </HStack>
        <HStack gap={4}>
          <Circle size="40px" bgColor="blue.600" color="white">
            I
          </Circle>
          <Input placeholder="Instagram" />
        </HStack>
      </Grid>
    </VStack>
  );
};

export default SocialMedia;
