import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TDelete, TTablePenjualan, TUpdate } from './types';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    id: 'TRX-09823',
    id_penjual: 'XA-321',
    jenis_komoditas: 'Cengkeh Basah',
    berat_kg: '45Kg',
    harga_rp: '35.000',
    tanggal: '12/07/2023',
    catatan: '-',
    action: {
      update: {
        id: 'TRX-09823',
        id_penjual: 'XA-321',
        jenis_komoditas: 'Cengkeh Basah',
        berat_kg: '45Kg',
        harga_rp: '35.000',
        tanggal: '12/07/2023',
        catatan: '-',
      },
      delete: { id: 'TRX-09823' },
    },
  },
];

type Props = {
  onDelete: (data: TDelete) => void;
  onUpdate: (data: TUpdate) => void;
};

const TabelPenjualan = ({
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTablePenjualan>();
  const columns = [
    columnHelper.accessor('id_penjual', {
      id: 'id_penjual',
      header: () => <Box>Id Penjual</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('jenis_komoditas', {
      id: 'jenis_komoditas',
      header: () => <Box>Komoditas</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat_kg', {
      id: 'berat',
      header: () => <Box>Berat</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('harga_rp', {
      id: 'harga',
      header: () => <Box>Harga</Box>,
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

export default TabelPenjualan;
