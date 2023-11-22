import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableBahan } from './types';
import { NumericFormat } from 'react-number-format';
import { TUpdateBahan, TDeleteBahan } from './schema';

type Props = {
  data: any[];
  isLoading: boolean;
  onDelete: (data: TDeleteBahan) => void;
  onUpdate: (data: TUpdateBahan) => void;
};

const TabelBahan = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableBahan>();
  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => <Center>id</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('berat_kg', {
      id: 'berat',
      header: () => <Center>Berat</Center>,
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
    columnHelper.accessor('volume_liter', {
      id: 'volume',
      header: () => <Center>Volume</Center>,
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
    columnHelper.accessor('waktu_mulai', {
      id: 'waktu_mulai',
      header: () => <Center>Waktu Mulai</Center>,
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
              title="Klik untuk mengubah data bahan pengeringan"
              cursor="pointer"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              as="button"
              title="Klik untuk menghapus data bahan pengeringan"
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

export default TabelBahan;
