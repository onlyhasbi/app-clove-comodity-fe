import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaHasil } from './schema';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
];

type TTableHasil = TSchemaHasil & { action: string };

const TableHasil = () => {
  const columnHelper = createColumnHelper<TTableHasil>();
  const columns = [
    columnHelper.accessor('lahan', {
      id: 'lahan',
      header: () => <Box>Lahan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat', {
      id: 'berat',
      header: () => <Box>Berat</Box>,
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

export default TableHasil;
