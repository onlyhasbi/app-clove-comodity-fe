import Table from '../../../components/table';
import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaLahan } from './schema';

const dummy = [
  {
    nama: 'Dulcia Guenther',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: true,
    luas_lahan: 93,
    alamat: '99 Glendale Parkway',
  },
  {
    nama: 'Laurence Butterfill',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: false,
    luas_lahan: 88,
    alamat: '91 Armistice Point',
  },
  {
    nama: 'Konstanze Matyashev',
    provinsi: 'Anchorage',
    kabupaten: 'Alaska',
    status_lahan: true,
    luas_lahan: 30,
    alamat: '9276 Golf View Hill',
  },
  {
    nama: 'Lorita Staresmeare',
    provinsi: 'Juneau',
    kabupaten: 'Alaska',
    status_lahan: false,
    luas_lahan: 33,
    alamat: '06 Harbort Center',
  },
  {
    nama: 'Elene Mapledoram',
    provinsi: 'Fairbanks',
    kabupaten: 'Alaska',
    status_lahan: false,
    luas_lahan: 28,
    alamat: '22426 Badeau Lane',
  },
];

const TableLahan = () => {
  const columnHelper = createColumnHelper<TSchemaLahan>();
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
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TableLahan;
