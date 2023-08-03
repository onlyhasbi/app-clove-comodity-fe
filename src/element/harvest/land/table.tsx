import Table from '../../../components/table';
import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableLahan } from './types';
import StatusLahan from '../../../components/status-lahan';
import Provinsi from '../../../components/provinsi';
import Kabupaten from '../../../components/kabupaten';
import { TSchemaDeleteLahan, TSchemaUpdateLahan } from './schema';
import { NumericFormat } from 'react-number-format';

type Props = {
  data: GetLahan[];
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
    columnHelper.accessor('hasil_panen', {
      id: 'hasil_panen',
      header: () => <Center>Panen (Kg)</Center>,
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

    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: ({ getValue }) => {
        const {
          delete: { hasil_panen },
        } = getValue();
        const isDisabled = Number(hasil_panen) > 0;

        return (
          <HStack justify="center" gap={3}>
            <Box
              as="button"
              cursor="pointer"
              title="Klik untuk mengubah data lahan"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>

            <Box
              as="button"
              disabled={isDisabled}
              title={`${
                isDisabled
                  ? 'Data lahan tidak dapat dihapus'
                  : 'Klik untuk menghapus data lahan'
              }`}
              cursor="pointer"
              color={`${isDisabled ? 'gray.500' : ''}`}
              _hover={{ color: `${!isDisabled ? 'red.600' : ''}` }}
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
