import Table from '../../components/table';
import { Box, HStack, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Trash2, Edit } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { JOBS, UNITS } from '../../model/offer.model';
import ActiveStatus from '../../components/active-status';
import { DeleteJob, UpdateJob, JobTable as JobTableType } from '../../types/Job';

type Props = {
  data: JobTableType[];
  isLoading?: boolean;
  onDelete: (data: DeleteJob) => void;
  onUpdate: (data: UpdateJob) => void;
  onUpdateStatus: (data: UpdateStatus) => void;
};

const JobTable = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  onUpdateStatus,
}: Props) => {
  const columnHelper = createColumnHelper<JobTableType>();
  const columns = [
    columnHelper.accessor('nama_pekerjaan', {
      id: 'nama_pekerjaan',
      header: () => <Box>Nama Pekerjaan</Box>,
      cell: ({ getValue }) => (
        <Box>{JOBS?.find((item) => item.value === getValue())?.label}</Box>
      ),
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
    columnHelper.accessor('satuan', {
      id: 'satuan',
      header: () => <Center>Satuan</Center>,
      cell: ({ getValue }) => (
        <Center>
          {UNITS?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('catatan', {
      id: 'catatan',
      header: () => <Box>Catatan</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
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
              _hover={{ color: 'green.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              title="hapus"
              cursor="pointer"
              _hover={{ color: 'green.600' }}
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

export default JobTable;
