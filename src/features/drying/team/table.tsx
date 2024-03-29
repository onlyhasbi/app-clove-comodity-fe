import Table from '../../../components/table';
import { Box, Center, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import {
  DeleteTeam,
  UpdateTeam,
  TeamTable as TeamTableType,
} from '../../../types/Team';
import { LabelBuruh } from '../../../components/user';

type Props = {
  isLoading?: boolean;
  data: any[];
  onDelete: (data: DeleteTeam) => void;
  onUpdate: (data: UpdateTeam) => void;
};

const TeamTable = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TeamTableType>();
  const columns = [
    columnHelper.accessor('nama_tim', {
      id: 'nama_tim',
      header: () => <Box>Nama Tim</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('ketua_tim', {
      id: 'ketua_tim',
      header: () => <Box>Ketua Tim</Box>,
      cell: ({ getValue }) => (
        <Box>
          <LabelBuruh id={getValue()} />
        </Box>
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
              title="Klik untuk mengubah data tim"
              cursor="pointer"
              _hover={{ color: 'blue.600' }}
              onClick={() => handleUpdate(getValue().update)}
            >
              <Edit height={15} width={15} />
            </Box>
            <Box
              as="button"
              title="Klik untuk menghapus data tim"
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

export default TeamTable;
