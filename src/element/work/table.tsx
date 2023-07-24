import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaPekerjaan } from './schema';
import { CheckCheck, Edit } from 'lucide-react';

const dummy = [
  {
    nama_pekerjaan: 'Pemetik',
    upah: '15.000',
    satuan: 'Harian',
    lokasi: 'Malino',
  },
  {
    nama_pekerjaan: 'Pemetik',
    upah: '15.000',
    satuan: 'Harian',
    lokasi: 'Sengkang',
  },
  {
    nama_pekerjaan: 'Pengeringan',
    upah: '25.000',
    satuan: 'Kg',
    lokasi: 'Malino',
  },
  {
    nama_pekerjaan: 'Pemetik',
    upah: '15.000',
    satuan: 'Harian',
    lokasi: 'Malino',
  },
  {
    nama_pekerjaan: 'Pengeringan',
    upah: '10.000',
    satuan: 'Ltr',
    lokasi: 'Sengkang',
  },
];

type TTablePekerjaan = TSchemaPekerjaan & { action: string };

const TablePenawaran = () => {
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
            <CheckCheck height={15} width={15} />
          </Box>
        </HStack>
      ),
    }),
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TablePenawaran;
