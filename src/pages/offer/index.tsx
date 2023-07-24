import FormPenawaran from '../../element/offer/form';
import TabelPenawaran from '../../element/offer/table';
import { Stack, Box, Text } from '@chakra-ui/react';

const Penawaran = () => {
  return (
    <Stack
      direction="column"
      spacing="2rem"
      paddingX={10}
      marginTop={5}
      paddingBottom="5rem"
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
          Penawaran Komoditas
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Tingkatkan profit dengan menawarkan komoditasmu
        </Text>
      </Box>
      <FormPenawaran />
      <Box marginTop={6}>
        <TabelPenawaran />
      </Box>
    </Stack>
  );
};

export default Penawaran;
