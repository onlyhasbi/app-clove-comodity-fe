import { useGetInfoBuruh } from '../../../../hooks/useOverview.hook';
import Table from '../../../../components/table';
import { Box, VStack, Text, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Check } from 'lucide-react';
import { tableAdapter } from './helper';
import { PEKERJAAN, SATUAN } from '../../../../model/penawaran.model';

type TLabor = {
  nama: string;
  jenis: string;
  upah: number;
  satuan: string;
  kontak: string;
  action: {
    accept: { id_lamaran: string; id_pelamar: string };
  };
};

const TabelBuruh = () => {
  const getInfoBuruh = useGetInfoBuruh();
  const infoBuruh = getInfoBuruh.isSuccess
    ? getInfoBuruh?.data?.data?.data?.lamaran
    : [];

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

    columnHelper.accessor('action', {
      id: 'action',
      header: () => <Center>Aksi</Center>,
      cell: ({ getValue }) => (
        <Center _hover={{ color: 'green.600' }} cursor="pointer" title="terima">
          <Check
            height={20}
            width={20}
            onClick={() => console.log(getValue())}
          />
        </Center>
      ),
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
      <Table data={tableAdapter(infoBuruh)} columns={columns} />
    </VStack>
  );
};

export default TabelBuruh;
