import { Box, Stack } from '@chakra-ui/react';
import TabelBuruh from './labor';
import TabelPenawaran from './offer';

function TableInfo() {
  return (
    <Stack direction="column" gap={10} w="full">
      <Box>
        <TabelBuruh />
      </Box>
      <Box>
        <TabelPenawaran />
      </Box>
    </Stack>
  );
}

export default TableInfo;
