import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TTablePenjualan } from './types';
import { TSchemaDeletePenjualan, TSchemaUpdatePenjualan } from './schema';
import { Edit, Trash2 } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { JENIS_KOMODITAS } from '../../../model/penawaran.model';

type Props = {
  isLoading?: boolean;
  data: any[];
  onDelete: (data: TSchemaDeletePenjualan) => void;
  onUpdate: (data: TSchemaUpdatePenjualan) => void;
};

const TabelPenjualan = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTablePenjualan>();
  const columns = [
    columnHelper.accessor('id_pembeli', {
      id: 'id_pembeli',
      header: () => <Center>Id Pembeli</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('jenis_komoditas', {
      id: 'jenis_komoditas',
      header: () => <Center>Komoditas</Center>,
      cell: ({ getValue }) => (
        <Center>
          {JENIS_KOMODITAS?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('berat_kg', {
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
    columnHelper.accessor('harga_rp', {
      id: 'harga',
      header: () => <Center>Harga</Center>,
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
              title="ubah"
              cursor="pointer"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              title="hapus"
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

  return <Table isLoading={isLoading} data={data} columns={columns} />;
};

export default TabelPenjualan;
