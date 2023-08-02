import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableHasil } from './types';
import { TSchemaDeleteHasil, TSchemaUpdateHasil } from './schema';
import { formatValue } from '../../../utils';

type Props = {
  data: any[];
  isLoading?: boolean;
  onDelete: (data: TSchemaDeleteHasil) => void;
  onUpdate: (data: TSchemaUpdateHasil) => void;
};

const TableHasil = ({
  data,
  isLoading,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableHasil>();
  const columns = [
    columnHelper.accessor('lahan', {
      id: 'lahan',
      header: () => <Box>Lahan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('berat', {
      id: 'berat',
      header: () => <Center>Berat</Center>,
      cell: ({ getValue }) => <Center>{formatValue(getValue(), 'Kg')}</Center>,
    }),
    columnHelper.accessor('volume', {
      id: 'volume',
      header: () => <Center>Volume</Center>,
      cell: ({ getValue }) => <Center>{formatValue(getValue(), 'Ltr')}</Center>,
    }),
    columnHelper.accessor('tanggal', {
      id: 'tanggal',
      header: () => <Center>Tanggal</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: ({ getValue }) => {
        return (
          <HStack gap={3} justify="center">
            <Box
              as="button"
              title="Klik untuk mengubah data hasil panen"
              cursor="pointer"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              as="button"
              title="Klik untuk menghapus data hasil panen"
              cursor="pointer"
              _hover={{ color: 'red.600' }}
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

export default TableHasil;
