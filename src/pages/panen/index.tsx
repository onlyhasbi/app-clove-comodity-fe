import { Box, Text } from '@chakra-ui/react';
import TabsPanen from '../../element/panen/tabs';

const Panen = () => (
  <>
    <Box paddingX={10}>
      <Box marginY={5}>
        <Text fontSize="3xl" color="gray.700" as="b">
          Panen
        </Text>
        <Text fontSize="sm" color="gray.500">
          Managemen hasil panen komoditas
        </Text>
      </Box>
      <TabsPanen />
    </Box>
  </>
);

export default Panen;
