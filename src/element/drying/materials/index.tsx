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
import FormBahan from './form';
import TabelBahan from './table';

const BahanPengeringan = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelBahan />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bahan Pengeringan</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormBahan />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BahanPengeringan;
