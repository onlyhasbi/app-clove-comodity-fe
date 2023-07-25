import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableLahan, TUpdate } from './types';

const dummy = [
  {
    id: '1',
    nama: 'Kentang Malino',
    provinsi: 'Sulawesi Selatan',
    kabupaten: 'Makassar',
    status_lahan: 'Sewa',
    luas_lahan: 93,
    alamat: '99 Glendale Parkway',
    action: {
      update: {
        id: '1',
        nama: 'Kentang Malino',
        provinsi: 'sulsel',
        kabupaten: 'makassar',
        status_lahan: 'Sewa',
        luas_lahan: 93,
        alamat: '99 Glendale Parkway',
      },
      delete: { id: 'Kentang Malino' },
    },
  },
];

type Props = {
  onDelete: (data: string) => void;
  onUpdate: (data: TUpdate) => void;
};

const TableLahan = ({
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableLahan>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('provinsi', {
      id: 'provinsi',
      header: () => <Box>Provinsi</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('kabupaten', {
      id: 'kabupaten',
      header: () => <Box>Kabupaten</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('status_lahan', {
      id: 'status_lahan',
      header: () => <Box>Status</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('luas_lahan', {
      id: 'luas_lahan',
      header: () => <Box>Luas</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('alamat', {
      id: 'alamat',
      header: () => <Box>Alamat</Box>,
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
              title="tidak aktif"
              cursor="pointer"
              _hover={{ color: 'brand.100' }}
              onClick={() => handleDelete(getValue().delete.id)}
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

export default TableLahan;
