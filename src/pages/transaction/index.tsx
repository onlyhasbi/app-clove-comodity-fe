import TabsTransaksi from '../../features/transaction/tabs';
import { Box, Text } from '@chakra-ui/react';

const TransactionPage = () => {
  return (
    <>
      <Box paddingX={10}>
        <Box marginY={5} lineHeight="1.5rem">
          <Text fontSize="3xl" color="gray.700" as="b" letterSpacing="-0.05rem">
            Transaksi
          </Text>
          <Text fontSize="sm" color="gray.500" letterSpacing="0.03rem">
            Managemen hasil transaksi komoditas
          </Text>
        </Box>
        <TabsTransaksi />
      </Box>
    </>
  );
};

export default TransactionPage;
