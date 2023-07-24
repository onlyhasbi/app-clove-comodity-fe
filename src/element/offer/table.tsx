import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaPenawaran } from './schema';
import { MinusSquare, Edit } from 'lucide-react';

const dummy = [
  {
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '15.000',
    berat_min: '100',
    berat_max: '200',
  },
  {
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '25.000',
    berat_min: '50',
    berat_max: '100',
  },
  {
    jenis_penawaran: 'Pembelian',
    komoditas: 'Cengkeh Kering',
    satuan: 'Kg',
    harga: '10.000',
    berat_min: '1500',
    berat_max: '1800',
  },
  {
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '15.000',
    berat_min: '100',
    berat_max: '200',
  },
  {
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '15.000',
    berat_min: '100',
    berat_max: '200',
  },
  {
    jenis_penawaran: 'Penjualan',
    komoditas: 'Cengkeh Basah',
    satuan: 'Kg',
    harga: '15.000',
    berat_min: '100',
    berat_max: '200',
  },
];

type TTablePenawaran = TSchemaPenawaran & { action: string };

const TablePenawaran = () => {
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
            <MinusSquare height={15} width={15} />
          </Box>
        </HStack>
      ),
    }),
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TablePenawaran;
