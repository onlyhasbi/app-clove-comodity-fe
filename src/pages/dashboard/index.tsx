import { useAuth } from '../../hooks/useAuth.hooks';
import { Center, Stack, Text } from '@chakra-ui/react';

function Dashboard() {
  const isAuthSuccess = useAuth();
  if (!isAuthSuccess) return null;

  return (
    <Center w="full" h="100vh">
      <Stack direction="column">
        <Text fontSize="3xl" fontWeight="bold">
          Clove Comodity Dashboard
        </Text>
      </Stack>
    </Center>
  );
}

export default Dashboard;
