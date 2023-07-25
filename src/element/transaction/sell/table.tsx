import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaPenjualan } from './schema';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    id_penjual: 'XA-321',
    jenis_komoditas: 'Cengkeh Basah',
    berat_kg: '45Kg',
    harga_rp: '35.000',
    tanggal: '12/07/2023',
    catatan: '-',
  },
  {
    id_penjual: 'XA-155',
    jenis_komoditas: 'Cengkeh Kering',
    berat_kg: '23Kg',
    harga_rp: '25.000',
    tanggal: '02/07/2023',
    catatan: '-',
  },
  {
    id_penjual: 'XA-97',
    jenis_komoditas: 'Cengkeh Basah',
    berat_kg: '92Kg',
    harga_rp: '22.000',
    tanggal: '18/07/2023',
    catatan: '-',
  },
  {
    id_penjual: 'XA-742',
    jenis_komoditas: 'Cengkeh Basah',
    berat_kg: '45Kg',
    harga_rp: '35.000',
    tanggal: '12/07/2023',
    catatan: '-',
  },
  {
    id_penjual: 'XA-523',
    jenis_komoditas: 'Cengkeh Kering',
    berat_kg: '58Kg',
    harga_rp: '30.000',
    tanggal: '08/07/2023',
    catatan: '-',
  },
];

type TTablePenjualan = TSchemaPenjualan & { action: string };

const TabelPenjualan = () => {
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

export default TabelPenjualan;
