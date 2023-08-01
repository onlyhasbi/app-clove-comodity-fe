import Table from '../../../components/table';
import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableSetoran } from './types';
import { TSchemaDeleteSetoran, TSchemaUpdateSetoran } from './schema';
import { formatValue } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';

type Props = {
  onDelete: (data: TSchemaDeleteSetoran) => void;
  onUpdate: (data: TSchemaUpdateSetoran) => void;
  isLoading?: boolean;
  data: any[];
};

const TableSetoran = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableSetoran>();
  const columns = [
    columnHelper.accessor('id_buruh', {
      id: 'id_buruh',
      header: () => <Box>Buruh</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
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
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Center>Upah</Center>,
      cell: ({ getValue }) => (
        <Center w="5rem" overflow="hidden">
          <Text
            as={NumericFormat}
            value={getValue()}
            textAlign="center"
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),

    columnHelper.accessor('tanggal', {
      id: 'tanggal',
      header: () => <Center>Tgl. Setor</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('komplaint', {
      id: 'komplaint',
      header: () => <Center>Komplain</Center>,
      cell: ({ getValue }) => <Center>{getValue() ?? '-'}</Center>,
    }),
    columnHelper.accessor('status_bayar', {
      id: 'status_bayar',
      header: () => <Box>Status Bayar</Box>,
      cell: ({ getValue }) => (
        <Box textAlign="center">{getValue() ? 'Belum' : 'Lunas'}</Box>
      ),
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

export default TableSetoran;
