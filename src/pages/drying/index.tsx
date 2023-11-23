import { Box, Text } from '@chakra-ui/react';
import TabsPengeringan from '../../features/drying/tabs';

const Drying = () => {
  return (
    <>
      <Box paddingX={10}>
        <Box marginY={5} lineHeight="1.5rem">
          <Text fontSize="3xl" color="gray.700" as="b" letterSpacing="-0.05rem">
            Pengeringan
          </Text>
          <Text fontSize="sm" color="gray.500" letterSpacing="0.03rem">
            Managemen hasil pengeringan komoditas
          </Text>
        </Box>
        <TabsPengeringan />
      </Box>
    </>
  );
};

export default Drying;
