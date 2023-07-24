import { Stack } from '@chakra-ui/react';
import CardSummary from './card';
import Chart from './chart';
import TableInfo from './table';

function Overview() {
  return (
    <Stack direction="column" spacing={10}>
      <Chart />
      <CardSummary />
      <TableInfo />
    </Stack>
  );
}

export default Overview;
