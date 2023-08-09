import Table from '../../../../components/table';
import { Box, Text, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

const dummy = [
  {
    nama: 'Dulcia Guenther',
    trk: 'Jual',
    jumlah: 100,
    komoditas: 'Cengkeh Basah',
    phone: '08930525234',
  },
  {
    nama: 'Andre',
    trk: 'Beli',
    jumlah: 150,
    komoditas: 'Cengkeh Kering',
    phone: '05330524574',
  },
  {
    nama: 'Jeni',
    trk: 'Beli',
    jumlah: 36,
    komoditas: 'Cengkeh Basah',
    phone: '08312052524',
  },
  {
    nama: 'Agus',
    trk: 'Jual',
    jumlah: 84,
    komoditas: 'Cengkeh Basah',
    phone: '088035675234',
  },
  {
    nama: 'John',
    trk: 'Beli',
    jumlah: 25,
    komoditas: 'Cengkeh Basah',
    phone: '08348525234',
  },
];

type TOffer = {
  nama: string;
  trk: number;
  jumlah: string;
  komoditas: string;
  phone: string;
};

const TabelPenawaran = () => {
  
  const columnHelper = createColumnHelper<TOffer>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('trk', {
      id: 'trk',
      header: () => <Box>Trk.</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('jumlah', {
      id: 'jumlah',
      header: () => <Box>Jumlah</Box>,
      cell: ({ getValue }) => <Box>{`${getValue()} Kg`}</Box>,
    }),
    columnHelper.accessor('komoditas', {
      id: 'komoditas',
      header: () => <Box>Komoditas</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => <Box>Kontak</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
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
      <Table data={dummy} columns={columns} />
    </VStack>
  );
};

export default TabelPenawaran;
