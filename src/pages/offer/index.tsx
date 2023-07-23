import FormPenawaran from '../../element/offer/form';
import TabelPenawaran from '../../element/offer/table';
import { Stack } from '@chakra-ui/react';

const Penawaran = () => {
  return (
    <Stack
      direction="column"
      gap="2.5rem"
      paddingX={10}
      paddingTop={10}
      paddingBottom="5rem"
    >
      <FormPenawaran />
      <TabelPenawaran />
    </Stack>
  );
};

export default Penawaran;
