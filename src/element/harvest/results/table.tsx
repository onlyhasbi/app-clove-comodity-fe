import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TDelete, TTableHasil, TUpdate } from './types';

const dummy = [
  {
    lahan: 'Cengkeh Malino',
    berat: '3Ltr',
    tanggal: '24/07/2023',
    catatan: '99 Glendale Parkway',
    action: {
      update: {
        id: '1',
        lahan: 'Cengkeh Malino',
        berat: '3Ltr',
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

const TableHasil = ({
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
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

export default TableHasil;
