import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import Status from '../../../components/payment-status';
import { LabelBuruh } from '../../../components/user';
import {
  DeleteDeposit,
  DepositTable as TDepositTable,
  UpdateDeposit,
} from '@/types/Deposit';
import { UpdateStatusPayment } from '@/types/DryResult';

type Props = {
  listen: {
    statusSetoran?: string;
    data: any[];
    onUpdatePayment: (data: UpdateStatusPayment) => void;
    onDelete: (data: DeleteDeposit) => void;
    onUpdate: (data: UpdateDeposit) => void;
  };
};

const DepositTable = ({
  listen: {
    statusSetoran,
    data,
    onUpdatePayment: handlePayment,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  },
}: Props) => {
  const columnHelper = createColumnHelper<TDepositTable>();
  const columns = [
    columnHelper.accessor('id_buruh', {
      id: 'id_buruh',
      header: () => <Box>Buruh</Box>,
      cell: ({ getValue }) => (
        <Box>
          <LabelBuruh id={getValue()} />
        </Box>
      ),
    }),
    columnHelper.accessor('waktu_hasil_panen', {
      id: 'tanggal_panen',
      header: () => <Center textAlign="center">Tgl. Panen</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('berat_kg', {
      id: 'berat',
      header: () => <Center textAlign="center">Berat (Kg)</Center>,
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
      header: () => <Center textAlign="center">Volume (Ltr)</Center>,
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
    columnHelper.accessor('upah_rp', {
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

    columnHelper.accessor('waktu_setoran', {
      id: 'tanggal',
      header: () => <Center textAlign="center">Tgl. Setor</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('deskripsi_konplaint', {
      id: 'komplaint',
      header: () => <Center>Komplain</Center>,
      cell: ({ getValue }) => <Center>{getValue() ?? '-'}</Center>,
    }),
    columnHelper.accessor('status_pembayaran', {
      id: 'status_bayar',
      header: () => <Center>Pembayaran</Center>,
      cell: ({ getValue }) => {
        const { status_pembayaran, id_setoran } = getValue();
        return (
          <Center>
            <Status
              value={status_pembayaran}
              onConfirm={() =>
                handlePayment({
                  id: id_setoran,
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

  return (
    <Table
      data={data}
      isLoading={statusSetoran === 'loading'}
      columns={columns}
    />
  );
};

export default DepositTable;
