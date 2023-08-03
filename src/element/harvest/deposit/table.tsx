import Table from '../../../components/table';
import { Box, Button, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableSetoran } from './types';
import { TSchemaDeleteSetoran, TSchemaUpdateSetoran } from './schema';
import { NumericFormat } from 'react-number-format';
import { TableAdapterSetoran } from './helper';

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
    columnHelper.accessor('tanggal_panen', {
      id: 'tanggal_panen',
      header: () => <Center>Tanggal Panen</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('berat', {
      id: 'berat',
      header: () => <Center>Berat (Kg)</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            displayType="text"
            value={getValue() || 0}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),
    columnHelper.accessor('volume', {
      id: 'volume',
      header: () => <Center>Volume (Ltr)</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            displayType="text"
            value={getValue() || 0}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Center>
      ),
    }),
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Center>Upah</Center>,
      cell: ({ getValue }) => (
        <Center>
          <NumericFormat
            value={getValue()}
            displayType="text"
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
      header: () => <Center>Pembayaran</Center>,
      cell: ({ getValue }) => (
        <Center textAlign="center">
          {getValue() ? (
            'Lunas'
          ) : (
            <Button colorScheme="red" size="xs">
              Belum Dibayar
            </Button>
          )}
        </Center>
      ),
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: ({ getValue }) => {
        return (
          <HStack gap={3} justify="center">
            <Box
              as="button"
              title="Klik untuk mengubah data lahan"
              cursor="pointer"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              as="button"
              title="Klik untuk menghapus data setoran"
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

export default TableSetoran;
