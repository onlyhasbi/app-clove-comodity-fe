import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaLahan } from './schema';
import { Edit, Trash2 } from 'lucide-react';

const dummy = [
  {
    nama: 'Dulcia Guenther',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: 'Sewa',
    luas_lahan: 93,
    alamat: '99 Glendale Parkway',
  },
  {
    nama: 'Laurence Butterfill',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: 'Milik Sendiri',
    luas_lahan: 88,
    alamat: '91 Armistice Point',
  },
  {
    nama: 'Konstanze Matyashev',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: 'Sewa',
    luas_lahan: 30,
    alamat: '9276 Golf View Hill',
  },
  {
    nama: 'Lorita Staresmeare',
    provinsi: 'Juneau',
    kabupaten: 'Alaska',
    status_lahan: 'Sewa',
    luas_lahan: 33,
    alamat: '06 Harbort Center',
  },
  {
    nama: 'Elene Mapledoram',
    provinsi: 'Fairbanks',
    kabupaten: 'Alaska',
    status_lahan: 'Milik Sendiri',
    luas_lahan: 28,
    alamat: '22426 Badeau Lane',
  },
];

type TTableLahan = TSchemaLahan & { action: string };

const TableLahan = () => {
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

export default TableLahan;
