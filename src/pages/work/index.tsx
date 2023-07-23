import FormPekerjaan from '../../element/work/form';
import TabelPekerjaan from '../../element/work/table';
import { Stack } from '@chakra-ui/react';

const Pekerjaan = () => {
  return (
    <Stack
      direction="column"
      gap="2.5rem"
      paddingX={10}
      paddingTop={10}
      paddingBottom="5rem"
    >
      <FormPekerjaan />
      <TabelPekerjaan />
    </Stack>
  );
};

export default Pekerjaan;
