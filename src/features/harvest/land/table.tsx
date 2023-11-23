import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import District from '../../../components/district';
import LandStatus from '../../../components/land-status';
import Province from '../../../components/province';
import Table from '../../../components/table';
import { TDeleteLahan, TUpdateLahan } from './schema';
import { TTableLahan } from './types';

type Props = {
  data: any[];
  isLoading?: boolean;
  onDelete: (data: TDeleteLahan) => void;
  onUpdate: (data: TUpdateLahan) => void;
};

const LandTable = ({
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
          <Province value={getValue()} />
        </Center>
      ),
    }),
    columnHelper.accessor('kabupaten', {
      id: 'kabupaten',
      header: () => <Center>Kabupaten</Center>,
      cell: ({ getValue }) => (
        <Center>
          <District value={getValue()} />
        </Center>
      ),
    }),
    columnHelper.accessor('status_lahan', {
      id: 'status_lahan',
      header: () => <Center>Status</Center>,
      cell: ({ getValue }) => (
        <Center>
          <LandStatus value={getValue()} />
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

export default LandTable;
