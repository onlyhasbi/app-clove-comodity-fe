import Table from '../../../components/table';
import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaHasilPengeringan } from './schema';

const dummy = [
  {
    tim: 'Rakko 1',
    berat_kg: '25Kg',
    volume_liter: '34Ltr',
    waktu_selesai: '15/07/2023',
    catatan: 'Selesai tepat waktu',
  },
  {
    tim: 'Rakko 2',
    berat_kg: '52Kg',
    volume_liter: '12Ltr',
    waktu_selesai: '01/07/2023',
    catatan: 'Selesai tepat waktu',
  },
  {
    tim: 'Rakko 3',
    berat_kg: '14Kg',
    volume_liter: '5Ltr',
    waktu_selesai: '24/07/2023',
    catatan: 'Selesai tepat waktu',
  },
  {
    tim: 'Rakko 4',
    berat_kg: '76Kg',
    volume_liter: '40Ltr',
    waktu_selesai: '15/08/2023',
    catatan: 'Selesai tepat waktu',
  },
  {
    tim: 'Rakko 5',
    berat_kg: '94Kg',
    volume_liter: '67Ltr',
    waktu_selesai: '07/08/2023',
    catatan: 'Selesai tepat waktu',
  },
];

const TabelHasilPengeringan = () => {
  const columnHelper = createColumnHelper<TSchemaHasilPengeringan>();
  const columns = [
    columnHelper.accessor('tim', {
      id: 'tim',
      header: () => <Box>Tim</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat_kg', {
      id: 'berat',
      header: () => <Box>Berat</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('volume_liter', {
      id: 'volume',
      header: () => <Box>Volume</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('waktu_selesai', {
      id: 'waktu',
      header: () => <Box>Waktu Selesai</Box>,
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

export default TabelHasilPengeringan;
