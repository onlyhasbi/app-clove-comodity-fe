import Table from '../../../components/table';
import {
  Box,
  Button,
  Center,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { TTableHasilPengeringan } from './types';
import { TDeletePengeringan, TUpdatePengeringan } from './schema';
import { NumericFormat } from 'react-number-format';
import Team from '../../../components/tim';

type Props = {
  data: any[];
  isLoading: boolean;
  onDelete: (data: TDeletePengeringan) => void;
  onUpdate: (data: TUpdatePengeringan) => void;
};

const TabelHasilPengeringan = ({
  isLoading,
  data,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const columnHelper = createColumnHelper<TTableHasilPengeringan>();
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
      cell: ({ getValue }) => <Center>{getValue() || '-'}</Center>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Center>Status</Center>,
      cell: ({ getValue }) => (
        <Center textAlign="center">
          {getValue() ? (
            <Box color="green">
              <CheckCircle height={15} width={15} />
            </Box>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red" size="xs">
                  Belum Dibayar
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader
                  paddingX={5}
                  paddingY={3}
                  textAlign="left"
                  fontWeight="semibold"
                >
                  Konfirmasi
                </PopoverHeader>
                <PopoverBody whiteSpace="normal" textAlign="left" padding={5}>
                  Apakah anda telah melakukan pembayaran?
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <Button colorScheme="green">Lunas</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          )}
        </Center>
      ),
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

export default TabelHasilPengeringan;
