import { Box, Text } from '@chakra-ui/react';
import TabsPanen from '../../element/harvest/tabs';

const Panen = () => (
  <>
    <Box paddingX={10}>
      <Box marginY={5} lineHeight="1.5rem">
        <Text fontSize="3xl" color="gray.700" as="b" letterSpacing="-0.05rem">
          Panen
        </Text>
        <Text fontSize="sm" color="gray.500" letterSpacing="0.03rem">
          Managemen hasil panen komoditas
        </Text>
      </Box>
      <TabsPanen />
    </Box>
  </>
);

export default Panen;
