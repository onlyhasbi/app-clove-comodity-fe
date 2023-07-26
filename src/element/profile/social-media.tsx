import { Circle, Grid, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const SocialMedia = () => {
  return (
    <VStack gap={5} marginTop={5}>
      <Heading as="h3" fontSize="1.3rem" w="full" color="gray.700">
        Social Media
      </Heading>
      <Grid
        gridTemplateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }}
        w="full"
        gap={6}
      >
        <HStack gap={4}>
          <Circle size="40px" bgColor="#4267B2" color="white">
            <Facebook width="17px" height="17px" />
          </Circle>
          <Input placeholder="Facebook" />
        </HStack>
        <HStack gap={4}>
          <Circle size="40px" bgColor="#1DA1F2" color="white">
            <Twitter width="17px" height="17px" />
          </Circle>
          <Input placeholder="Twitter" />
        </HStack>
        <HStack gap={4}>
          <Circle size="40px" bgColor="#0A66C2" color="white">
            <Linkedin width="17px" height="17px" />
          </Circle>
          <Input placeholder="Linked In" />
        </HStack>
        <HStack gap={4}>
          <Circle
            size="40px"
            bgGradient="linear(to-tr, #FD1D1D,#E1306C,#C13584,)"
            color="white"
          >
            <Instagram width="17px" height="17px" />
          </Circle>
          <Input placeholder="Instagram" />
        </HStack>
      </Grid>
    </VStack>
  );
};

export default SocialMedia;
