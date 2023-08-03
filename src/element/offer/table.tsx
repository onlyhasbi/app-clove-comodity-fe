import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Trash2, Edit } from 'lucide-react';
import { TDelete, TTablePenawaran, TUpdate } from './types';

const dummy = [
  {
    id: 'TRX-24342',
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '15.000',
    berat_min: '100',
    berat_max: '200',
    action: {
      update: {
        id: 'TRX-24342',
        jenis_penawaran: 'Penjualan',
        komoditas: 'Cengkeh Basah',
        satuan: 'Kg',
        harga: '15.000',
        berat_min: '100',
        berat_max: '200',
      },
      delete: { id: 'TRX-24342' },
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
  const columnHelper = createColumnHelper<TTablePenawaran>();
  const columns = [
    columnHelper.accessor('jenis_penawaran', {
      id: 'jenis_penawaran',
      header: () => <Box>Jenis Penawaran</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('komoditas', {
      id: 'komoditas',
      header: () => <Box>Komoditas</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('satuan', {
      id: 'satuan',
      header: () => <Box>Satuan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('harga', {
      id: 'harga',
      header: () => <Box>Harga</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat_min', {
      id: 'berat_min',
      header: () => <Box>Berat Min.</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat_max', {
      id: 'berat_max',
      header: () => <Box>Berat Maks.</Box>,
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
              _hover={{ color: 'green.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              title="hapus"
              cursor="pointer"
              _hover={{ color: 'green.600' }}
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
