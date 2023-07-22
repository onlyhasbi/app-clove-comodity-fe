import { data } from '../../../model/chart.model';
import { Box, Stack, VStack } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function Chart() {
  return (
    <VStack gap={10}>
      <Stack w="full">
        <Box as="h4" fontSize="md">
          Earned
        </Box>
        <Box as="h1" fontSize="4xl" fontWeight={700}>
          $ 3.5 M
        </Box>
      </Stack>

      <Box width="full" height={350}>
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <LineChart
            data={data}
            margin={{
              right: 10,
              left: -2,
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              fontSize={10}
              color="#2563eb"
              strokeOpacity={0}
            />
            <YAxis
              dataKey="download"
              type="number"
              fontSize={10}
              color="#2563eb"
              strokeOpacity={0}
            />

            <Line
              dataKey="earn"
              type="monotone"
              strokeWidth={2.5}
              stroke="#2563eb"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
}

export default Chart;
