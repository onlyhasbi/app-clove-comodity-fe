import Table from '../../../components/table';
import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableLahan } from './types';
import StatusLahan from '../../../components/status-lahan';
import Provinsi from '../../../components/provinsi';
import Kabupaten from '../../../components/kabupaten';
import { TSchemaDeleteLahan, TSchemaUpdateLahan } from './schema';

type Props = {
  data: any[];
  isLoading?: boolean;
  onDelete: (data: TSchemaDeleteLahan) => void;
  onUpdate: (data: TSchemaUpdateLahan) => void;
};

const TableLahan = ({
  data,
  isLoading,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableLahan>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('provinsi', {
      id: 'provinsi',
      header: () => <Center>Provinsi</Center>,
      cell: ({ getValue }) => (
        <Center>
          <Provinsi value={getValue()} />
        </Center>
      ),
    }),
    columnHelper.accessor('kabupaten', {
      id: 'kabupaten',
      header: () => <Center>Kabupaten</Center>,
      cell: ({ getValue }) => (
        <Center>
          {' '}
          <Kabupaten value={getValue()} />
        </Center>
      ),
    }),
    columnHelper.accessor('status_lahan', {
      id: 'status_lahan',
      header: () => <Center>Status</Center>,
      cell: ({ getValue }) => (
        <Center>
          <StatusLahan value={getValue()} />
        </Center>
      ),
    }),
    columnHelper.accessor('luas_lahan', {
      id: 'luas_lahan',
      header: () => (
        <Center>
          Luas (M<Text as={'sup'}>2</Text>)
        </Center>
      ),
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('hasil_panen', {
      id: 'hasil_panen',
      header: () => <Center>Panen (Kg)</Center>,
      cell: ({ getValue }) => <Center>{getValue() || '0'}</Center>,
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

  return <Table data={data} isLoading={isLoading} columns={columns} />;
};

export default TableLahan;
