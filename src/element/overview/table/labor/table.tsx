import Table from '../../../../components/table';
import { Box, VStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

const dummy = [
  {
    nama: 'Dulcia Guenther',
    pekerjaan: 'Pemetik',
    action: '',
  },
  {
    nama: 'Agus',
    pekerjaan: 'Pengering',
    action: '',
  },
  {
    nama: 'Heni',
    pekerjaan: 'Pemetik',
    action: '',
  },

  {
    nama: 'Rahma',
    pekerjaan: 'Pengering',
    action: '',
  },
  {
    nama: 'Amri',
    pekerjaan: 'Pemetik',
    action: '',
  },
];

type TLabor = {
  nama: string;
  pekerjaan: string;
  action: string;
};

const TabelBuruh = () => {
  const columnHelper = createColumnHelper<TLabor>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('pekerjaan', {
      id: 'pekerjaan',
      header: () => <Box>Pekerjaan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),

    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Box>Action</Box>,
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
          color="brand.100"
        >
          Buruh
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Buruh yang melamar
        </Text>
      </Box>
      <Table data={dummy} columns={columns} />
    </VStack>
  );
};

export default TabelBuruh;
