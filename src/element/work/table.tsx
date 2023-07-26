import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Trash2, Edit } from 'lucide-react';
import { TDelete, TTablePekerjaan, TUpdate } from './types';

const dummy = [
  {
    id: '1',
    nama_pekerjaan: 'Pemetik',
    upah: '15.000',
    satuan: 'Harian',
    lokasi: 'Malino',
    action: {
      update: {
        id: '1',
        nama_pekerjaan: 'Pemetik',
        upah: '15.000',
        satuan: 'Harian',
        lokasi: 'Malino',
      },
      delete: { id: '1', nama: 'Pemetik' },
    },
  },
];

type Props = {
  onDelete: (data: TDelete) => void;
  onUpdate: (data: TUpdate) => void;
};

const TablePenawaran = ({
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTablePekerjaan>();
  const columns = [
    columnHelper.accessor('nama_pekerjaan', {
      id: 'nama_pekerjaan',
      header: () => <Box>Nama Pekerjaan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Box>Upah</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('satuan', {
      id: 'satuan',
      header: () => <Box>Satuan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('lokasi', {
      id: 'lokasi',
      header: () => <Box>Lokasi</Box>,
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

export default TablePenawaran;
