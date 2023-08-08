import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { TTableHasilPengeringan } from './types';
import { TDeletePengeringan, TUpdatePengeringan } from './schema';
import { NumericFormat } from 'react-number-format';
import { useUpdateBahan } from '../../../hooks/useDryResult.hook';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { url } from '../../../utils/config/url';
import SelectBahanPengeringan from '../../../components/bahan-pengeringan';
import Team from '../../../components/tim';
import Status from '../../../components/pembayaran';

type Props = {
  listen: {
    isLoading: boolean;
    data: any[];
    onUpdatePayment: (data: TUpdateStatusPayment) => void;
    onDelete: (data: TDeletePengeringan) => void;
    onUpdate: (data: TUpdatePengeringan) => void;
  };
};

const TabelHasilPengeringan = ({
  listen: {
    isLoading,
    data,
    onUpdatePayment: handlePayment,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  },
}: Props) => {
  const columnHelper = createColumnHelper<TTableHasilPengeringan>();
  const queryClient = useQueryClient();
  const updateBahan = useUpdateBahan();

  useEffect(() => {
    if (updateBahan.isSuccess) {
      queryClient.refetchQueries({
        queryKey: [url.pengeringan.dev],
        type: 'active',
      });
    }
  }, [updateBahan.isSuccess]);

  const columns = [
    columnHelper.accessor('tim', {
      id: 'tim',
      header: () => <Box>Tim</Box>,
      cell: ({ getValue }) => (
        <Box>
          <Team value={getValue()} />
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

        const handleSetBahan = (value: string) => {
          updateBahan.mutate({ id_bahan: value, id_hasil: id });
        };

        if (!nama)
          return (
            <Center w="7rem">
              <SelectBahanPengeringan onSetBahan={handleSetBahan} />
            </Center>
          );

        return <Center>{nama}</Center>;
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

export default TabelHasilPengeringan;
