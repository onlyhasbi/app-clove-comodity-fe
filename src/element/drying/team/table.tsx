import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaTim } from './schema';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    nama: 'Rakko 1',
    ketua: 'Aso',
    anggota: `andi, joko, erni`,
  },
  {
    nama: 'Rakko 2',
    ketua: 'Indah',
    anggota: `andi, joko, erni`,
  },
  {
    nama: 'Rakko 3',
    ketua: 'Andi',
    anggota: `andi, joko, erni`,
  },
  {
    nama: 'Rakko 4',
    ketua: 'Reno',
    anggota: `andi, joko, erni`,
  },
  {
    nama: 'Rakko 5',
    ketua: 'Aco',
    anggota: `andi', 'joko', 'erni`,
  },
];

type TTableTim = TSchemaTim & { action: string };

const TabelTim = () => {
  const columnHelper = createColumnHelper<TTableTim>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('ketua', {
      id: 'ketua',
      header: () => <Box>Ketua</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('anggota', {
      id: 'anggota',
      header: () => <Box>Anggota</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: () => (
        <HStack gap={3} justify="center">
          <Box title="ubah" cursor="pointer" _hover={{ color: 'brand.100' }}>
            <Edit height={15} width={15} />
          </Box>
          <Box
            title="tidak aktif"
            cursor="pointer"
            _hover={{ color: 'brand.100' }}
          >
            <Trash2 height={15} width={15} />
          </Box>
        </HStack>
      ),
    }),
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TabelTim;
