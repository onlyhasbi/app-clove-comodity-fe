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
import FormHasilPengeringan from './form';
import TabelHasilPengeringan from './table';

const HasilPengeringan = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelHasilPengeringan />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hasil Pengeringan</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormHasilPengeringan />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HasilPengeringan;
