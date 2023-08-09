import Table from '../../../../components/table';
import { Box, VStack, Text, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { tableAdapter } from './helper';
import { PEKERJAAN, SATUAN } from '../../../../model/penawaran.model';

type TLabor = {
  nama: string;
  jenis: string;
  upah: number;
  satuan: string;
  kontak: string;
};

type Props = {
  data: any[];
  isLoading: boolean;
};

const TabelBuruh = ({ isLoading, data }: Props) => {
  const columnHelper = createColumnHelper<TLabor>();
  const columns = [
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => <Box>Nama</Box>,
      cell: ({ getValue }) => <Box>{getValue()}</Box>,
    }),
    columnHelper.accessor('jenis', {
      id: 'jenis',
      header: () => <Center>Jenis</Center>,
      cell: ({ getValue }) => (
        <Center>
          {PEKERJAAN?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('upah', {
      id: 'upah',
      header: () => <Center>Upah</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
    columnHelper.accessor('satuan', {
      id: 'satuan',
      header: () => <Center>Satuan</Center>,
      cell: ({ getValue }) => (
        <Center>
          {SATUAN?.find((item) => item.value === getValue())?.label}
        </Center>
      ),
    }),
    columnHelper.accessor('kontak', {
      id: 'kontak',
      header: () => <Center>Kontak</Center>,
      cell: ({ getValue }) => <Center>{getValue()}</Center>,
    }),
  ];

  return (
    <VStack gap={25}>
      <Box w="full">
        <Text
          as="h2"
          fontSize="xl"
          w="full"
          fontWeight={700}
          letterSpacing="-0.01rem"
          textAlign="left"
          color="green.600"
        >
          Buruh
        </Text>
        <Text
          as="h2"
          fontSize="sm"
          w="full"
          fontWeight={500}
          letterSpacing="0.02rem"
          textAlign="left"
        >
          Buruh yang melamar
        </Text>
      </Box>
      <Table
        data={tableAdapter(data)}
        isLoading={isLoading}
        columns={columns}
      />
    </VStack>
  );
};

export default TabelBuruh;
