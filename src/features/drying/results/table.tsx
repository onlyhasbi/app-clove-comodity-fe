import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import SelectDryMaterial from '../../../components/select-dry-material';
import Team from '../../../components/team';
import Status from '../../../components/payment-status';
import {
  UpdateMaterialPayload,
  UpdateStatusPayment,
  DeleteDryResult,
  UpdateDryResult,
  DryResultTable,
} from '../../../types/DryResult';

type Props = {
  listen: {
    isLoading: boolean;
    data: any[];
    onUpdatePayment: (data: UpdateStatusPayment) => void;
    onUpdateMaterial: (data: UpdateMaterialPayload) => void;
    onDelete: (data: DeleteDryResult) => void;
    onUpdate: (data: UpdateDryResult) => void;
  };
};

const DryingResultTable = ({
  listen: {
    isLoading,
    data,
    onUpdatePayment: handlePayment,
    onUpdateMaterial: handleMaterial,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  },
}: Props) => {
  const columnHelper = createColumnHelper<DryResultTable>();

  const columns = [
    columnHelper.accessor('tim', {
      id: 'tim',
      header: () => <Box>Tim</Box>,
      cell: ({ getValue }) => (
        <Box>
          <Team id={getValue()} />
        </Box>
      ),
    }),
    columnHelper.accessor('berat', {
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
    columnHelper.accessor('volume', {
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
    columnHelper.accessor('tanggal', {
      id: 'tanggal',
      header: () => <Center>Waktu Selesai</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Center>Upah</Center>,
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
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('bahan', {
      id: 'bahan',
      header: () => <Center>Bahan</Center>,
      cell: ({ getValue }) => {
        const { id, nama } = getValue();

        const handleGetBahan = (value: string) => {
          handleMaterial({ id_bahan: value, id_hasil: id });
        };

        return !nama ? (
          <Center w="7rem">
            <SelectDryMaterial onSetBahan={handleGetBahan} />
          </Center>
        ) : (
          <Center>{nama}</Center>
        );
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Center>Status</Center>,
      cell: ({ getValue }) => {
        const { status_pembayaran, id_hasil_pengeringan } = getValue();

        return (
          <Center>
            <Status
              value={status_pembayaran}
              onConfirm={() =>
                handlePayment({
                  id: id_hasil_pengeringan,
                  status: !status_pembayaran,
                })
              }
            />
          </Center>
        );
      },
    }),

    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: ({ getValue }) => {
        return (
          <HStack gap={3} justify="center">
            <Box
              as="button"
              title="Klik untuk mengubah data hasil pengeringan"
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

export default DryingResultTable;
