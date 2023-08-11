import { Center, Box, Text, Button, VStack } from '@chakra-ui/react';
import { FallbackProps } from 'react-error-boundary';
import { MoveLeft } from 'lucide-react';
import error from '../../assets/error.svg';

type Props = {
  title: string;
  action: () => void;
};

const ErrorTemplate = ({ title, action }: Props) => (
  <Center w="full" minH="100vh" textAlign="center">
    <VStack gap={4} w="30rem">
      <img src={error} alt="error-occured" />
      <Box marginY={3}>
        <Text fontSize="xl" fontWeight={700} marginBottom={2} color="gray.700">
          {`Ops, ${title}`}
        </Text>
        <Text color="gray.600">{`Aplikasi mendeteksi adanya kesalahan, dan telah dilaporkan ke tim pengembangan aplikasi`}</Text>
      </Box>
      <Box w="full" marginTop={1}>
        <Button
          variant="ghost"
          onClick={() => action()}
          leftIcon={<MoveLeft />}
        >
          Kembali
        </Button>
      </Box>
    </VStack>
  </Center>
);

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);
  return (
    <ErrorTemplate title="Terjadi Kesalahan" action={resetErrorBoundary} />
  );
}

export default ErrorFallBack;
