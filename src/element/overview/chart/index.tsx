import { data } from '../../../model/chart.model';
import { Box, Stack, VStack, Text } from '@chakra-ui/react';
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
      <Stack w="full" lineHeight="2.2rem">
        <Text as="h4" fontSize="md" letterSpacing="0.05rem">
          Earned
        </Text>
        <Stack direction="row" alignItems="center">
          <Text as="sup" fontSize="2xl" fontWeight={700}>
            Rp.
          </Text>
          <Text
            as="h1"
            fontSize="5xl"
            fontWeight={700}
            letterSpacing="-0.05rem"
          >
            3.500.000
          </Text>
        </Stack>
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
              color="#548c31"
              strokeOpacity={0}
            />
            <YAxis
              dataKey="download"
              type="number"
              fontSize={10}
              color="#548c31"
              strokeOpacity={0}
            />

            <Line
              dataKey="earn"
              type="monotone"
              strokeWidth={2.5}
              stroke="#548c31"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
}

export default Chart;
