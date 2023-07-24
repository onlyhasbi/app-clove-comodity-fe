import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaSetoran } from './schema';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    lahan: 'Dulcia Guenther',
    volume: '3 Ltr',
    upah: 'Alaska',
    id_buruh: 'B-72',
    tanggal: 93,
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Bulukumba',
    volume: '8 Ltr',
    upah: '65.000',
    id_buruh: 'B-98',
    tanggal: '31/02/2009',
    catatan: 'Catatan B-098',
  },
  {
    lahan: 'Malili',
    volume: '3 Ltr',
    upah: '95.000',
    id_buruh: 'B-98',
    tanggal: '31/02/2009',
    catatan: 'Catatan B-098',
  },
  {
    lahan: 'Sengkang',
    volume: '6 Ltr',
    upah: '15.000',
    id_buruh: 'B-98',
    tanggal: '31/02/2009',
    catatan: 'Catatan B-098',
  },
  {
    lahan: 'Sinjai',
    volume: '1 Ltr',
    upah: '25.0000',
    id_buruh: 'B-05',
    tanggal: '28/02/2021',
    catatan: 'Catatan B-05',
  },
];

type TTableSetoran = TSchemaSetoran & { action: string };

const TableSetoran = () => {
  const columnHelper = createColumnHelper<TTableSetoran>();
  const columns = [
    columnHelper.accessor('lahan', {
      id: 'lahan',
      header: () => <Box>Lahan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('volume', {
      id: 'volume',
      header: () => <Box>Volume</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Box>Upah</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('id_buruh', {
      id: 'id_buruh',
      header: () => <Box>Buruh</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('tanggal', {
      id: 'tanggal',
      header: () => <Box>Tanggal</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
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

export default TableSetoran;
