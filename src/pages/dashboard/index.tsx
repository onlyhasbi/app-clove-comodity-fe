import Overview from '../../element/overview';
import { Box } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Box w="full" minH="100vh" paddingX={7} paddingTop={7} paddingBottom={20}>
      <Overview />
    </Box>
  );
}

export default Dashboard;
