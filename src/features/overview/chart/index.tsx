import { Stack } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

type Props = {
  dataUpah: {
    upah: number;
    tanggal: string;
  }[];

  dataCengkeh: {
    cengkeh_basah: string;
    cengkeh_kering: string;
    tanggal: string;
  }[];
};

function Chart({ dataUpah, dataCengkeh }: Props) {
  return (
    <Stack direction={{ lg: 'row', base: 'column' }} gap={8}>
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart
          data={dataUpah}
          margin={{
            right: 10,
            top: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="tanggal"
            fontSize={10}
            color="#2D3748"
            strokeOpacity={0}
          />
          <YAxis
            dataKey="upah"
            type="number"
            fontSize={10}
            color="#2D3748"
            strokeOpacity={0}
          />
          <Tooltip />
          <Legend />

          <Bar dataKey="upah" name="Upah" fill="#48BB78" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <BarChart
          data={dataCengkeh}
          margin={{
            right: 10,
            top: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="tanggal"
            fontSize={10}
            color="#2D3748"
            strokeOpacity={0}
          />
          <YAxis
            dataKey={'cengkeh_basah' || 'cengkeh_kering'}
            type="number"
            fontSize={10}
            color="#2D3748"
            strokeOpacity={0}
          />
          <Tooltip />
          <Legend />

          <Bar dataKey="cengkeh_basah" name="Cengkeh Basah" fill="#805AD5" />
          <Bar dataKey="cengkeh_kering" name="Cengkeh Kering" fill="#ED8936" />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default Chart;
