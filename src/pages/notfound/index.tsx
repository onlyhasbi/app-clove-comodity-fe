import { VStack, HStack, Center, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import notfound from '../../assets/notfound.svg';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Center w="full" minH="100vh">
      <VStack gap={4} w="30rem">
        <img src={notfound} alt="not-found" />
        <HStack as="h2">
          <Text as="h2" fontWeight="bold">
            404
          </Text>
          <Text>{` | Page not found`}</Text>
        </HStack>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          leftIcon={<MoveLeft />}
        >
          Kembali
        </Button>
      </VStack>
    </Center>
  );
}
