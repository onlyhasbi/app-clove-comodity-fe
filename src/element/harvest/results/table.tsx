import Table from '../../../components/table';
import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaHasil } from './schema';

const dummy = [
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
  {
    lahan: 'Dulcia Guenther',
    berat: 'Anchorage',
    tanggal: 'Alaska',
    catatan: '99 Glendale Parkway',
  },
];

const TableHasil = () => {
  const columnHelper = createColumnHelper<TSchemaHasil>();
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
  ];

  return <Table data={dummy} columns={columns} />;
};

export default TableHasil;
