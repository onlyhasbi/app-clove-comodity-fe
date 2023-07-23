import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Box,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import FormHasil from './form';
import TableHasil from './table';

const Hasil = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TableHasil />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Hasil</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormHasil />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Hasil;
