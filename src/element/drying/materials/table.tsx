import Table from '../../../components/table';
import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaBahanPengeringan } from './schema';

const dummy = [
  {
    berat_kg: '45Kg',
    volume_liter: '15Ltr',
    waktu_mulai: '12/07/2023',
    catatan: 'Kembali 3 hari lagi',
  },
  {
    berat_kg: '32Kg',
    volume_liter: '20Ltr',
    waktu_mulai: '11/09/2023',
    catatan: 'Kembali 3 hari lagi',
  },
  {
    berat_kg: '10Kg',
    volume_liter: '5Ltr',
    waktu_mulai: '12/07/2023',
    catatan: 'Kembali 3 hari lagi',
  },
  {
    berat_kg: '18Kg',
    volume_liter: '10Ltr',
    waktu_mulai: '02/08/2023',
    catatan: 'Kembali 3 hari lagi',
  },
  {
    berat_kg: '54Kg',
    volume_liter: '35Ltr',
    waktu_mulai: '18/07/2023',
    catatan: 'Kembali 3 hari lagi',
  },
];

const TabelBahan = () => {
  const columnHelper = createColumnHelper<TSchemaBahanPengeringan>();
  const columns = [
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
    columnHelper.accessor('waktu_mulai', {
      id: 'waktu',
      header: () => <Box>Waktu Mulai</Box>,
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

export default TabelBahan;
