import FormPekerjaan from '../../element/work/form';
import TabelPekerjaan from '../../element/work/table';
import { Stack, Box, Text } from '@chakra-ui/react';

const Pekerjaan = () => {
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
          Dapatkan Buruh
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Dapatkan buruh dengan menambah pekerjaan baru
        </Text>
      </Box>
      <FormPekerjaan />
      <Box marginTop={6}>
        <TabelPekerjaan />
      </Box>
    </Stack>
  );
};

export default Pekerjaan;
