import { Box, Stack } from '@chakra-ui/react';
import TabelBuruh from './labor';
import TabelPenawaran from './offer';

function TableInfo() {
  return (
    <Stack
      direction={{ lg: 'row', base: 'column' }}
      justify="space-between"
      w="full"
    >
      <Box w={{ lg: '385px', base: 'full' }}>
        <TabelBuruh />
      </Box>
      <Box w={{ lg: '650px', base: 'full' }}>
        <TabelPenawaran />
      </Box>
    </Stack>
  );
}

export default TableInfo;
