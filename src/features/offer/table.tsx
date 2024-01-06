import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Trash2, Edit } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { COMODITY_TYPE, OFFER_TYPE, UNITS } from '../../model/offer.model';
import {
  DeleteOffer,
  UpdateOffer,
  OfferTable as OfferTableType,
} from '../../types/Offer';
import ActiveStatus from '../../components/active-status';

type Props = {
  data: any[];
  isLoading?: boolean;
  onDelete: (data: DeleteOffer) => void;
  onUpdate: (data: UpdateOffer) => void;
  onUpdateStatus: (data: UpdateStatus) => void;
};

const OfferTable = ({
  data,
  isLoading,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  onUpdateStatus,
}: Props) => {
  const columnHelper = createColumnHelper<OfferTableType>();

  const columns = [
    columnHelper.accessor('jenis_penawaran', {
      id: 'jenis_penawaran',
      header: () => <Center>Jenis Penawaran</Center>,
      cell: ({ getValue }) => (
        <Center>
          {OFFER_TYPE?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('komoditas', {
      id: 'komoditas',
      header: () => <Center>Komoditas</Center>,
      cell: ({ getValue }) => (
        <Center>
          {COMODITY_TYPE?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('satuan', {
      id: 'satuan',
      header: () => <Center>Satuan</Center>,
      cell: ({ getValue }) => (
        <Center>
          {UNITS?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('harga', {
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
    columnHelper.accessor('berat_min', {
      id: 'berat_min',
      header: () => <Center>Berat Min. (Kg)</Center>,
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
    columnHelper.accessor('berat_max', {
      id: 'berat_max',
      header: () => <Center>Berat Maks. (Kg)</Center>,
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
      header: () => <Center>Catatan</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Center>Status</Center>,
      cell: ({ getValue }) => {
        const { id, value: initialValue } = getValue();

        return (
          <ActiveStatus
            initialValue={initialValue}
            getActiveValue={(value: boolean) => onUpdateStatus({ id, value })}
          />
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

  return <Table data={data} isLoading={isLoading} columns={columns} />;
};

export default OfferTable;
