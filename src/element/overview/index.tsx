import { Stack, Box } from '@chakra-ui/react';
import CardSummary from './card';
import Chart from './chart';
import TableInfo from './table';

function Overview() {
  return (
    <Stack direction="column" spacing={10}>
      <Box>
        <Chart />
      </Box>
      <Box>
        <CardSummary />
      </Box>
      <Box>
        <TableInfo />
      </Box>
    </Stack>
  );
}

export default Overview;
