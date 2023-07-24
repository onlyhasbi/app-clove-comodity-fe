import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TSchemaHasilPengeringan } from './schema';
import { Edit, Trash2 } from 'lucide-react';

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

type TTableHasilPengeringan = TSchemaHasilPengeringan & { action: string };

const TabelHasilPengeringan = () => {
  const columnHelper = createColumnHelper<TTableHasilPengeringan>();
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

export default TabelHasilPengeringan;
