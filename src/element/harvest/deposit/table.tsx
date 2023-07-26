import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TDelete, TTableSetoran, TUpdate } from './types';

const dummy = [
  {
    id: '1',
    lahan: 'Cengkeh Malino',
    volume: '3 Ltr',
    upah: '25.000',
    id_buruh: 'B-72',
    tanggal: '93',
    catatan: '99 Glendale Parkway',
    action: {
      update: {
        id: '1',
        lahan: 'Cengkeh Malino',
        volume: '3 Ltr',
        upah: '25.000',
        id_buruh: 'B-72',
        tanggal: '24/07/2023',
        catatan: '99 Glendale Parkway',
      },
      delete: { id: '1', lahan: 'Cengkeh Malino' },
    },
  },
];

type Props = {
  onDelete: (data: TDelete) => void;
  onUpdate: (data: TUpdate) => void;
};

const TableSetoran = ({
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
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
      cell: ({ getValue }) => {
        return (
          <HStack gap={3} justify="center">
            <Box
              title="ubah"
              cursor="pointer"
              _hover={{ color: 'brand.100' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              title="hapus"
              cursor="pointer"
              _hover={{ color: 'brand.100' }}
              onClick={() => handleDelete(getValue().delete)}
            >
              <Trash2 height={15} width={15} />
            </Box>
          </HStack>
        );
      },
    }),
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TableSetoran;
