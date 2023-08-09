import Table from '../../../../components/table';
import { Box, Text, VStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { tableAdapter } from './helper';
import { NumericFormat } from 'react-number-format';
import {
  JENIS_KOMODITAS,
  JENIS_PENAWARAN,
} from '../../../../model/penawaran.model';

type TOffer = {
  nama: string;
  penawaran: string;
  komoditas: string;
  min: number;
  max: number;
  harga: number;
  kontak: string;
};

type Props = {
  isLoading: boolean;
  data: any[];
};

const TabelPenawaran = ({ isLoading, data }: Props) => {
  const columnHelper = createColumnHelper<TOffer>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('penawaran', {
      id: 'penawaran',
      header: () => <Center>Trk.</Center>,
      cell: ({ getValue }) => (
        <Center>
          {JENIS_PENAWARAN?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('komoditas', {
      id: 'komoditas',
      header: () => <Center>Komoditas</Center>,
      cell: ({ getValue }) => (
        <Center>
          {JENIS_KOMODITAS?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('min', {
      id: 'min',
      header: () => <Center>Min.</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            displayType="text"
            value={getValue() || 0}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),
    columnHelper.accessor('max', {
      id: 'max',
      header: () => <Center>Max.</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            displayType="text"
            value={getValue() || 0}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),
    columnHelper.accessor('harga', {
      id: 'harga',
      header: () => <Center>Harga</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            displayType="text"
            value={getValue() || 0}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),
    columnHelper.accessor('kontak', {
      id: 'kontak',
      header: () => <Center>Kontak</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
  ];

  return (
    <VStack gap={25}>
      <Box w="full">
        <Text
          as="h2"
          fontSize="xl"
          w="full"
          fontWeight={700}
          letterSpacing="-0.01rem"
          textAlign="left"
          color="green.600"
        >
          Penawaran
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Penawaran komoditas terbaru
        </Text>
      </Box>
      <Table
        data={tableAdapter(data)}
        isLoading={isLoading}
        columns={columns}
      />
    </VStack>
  );
};

export default TabelPenawaran;
