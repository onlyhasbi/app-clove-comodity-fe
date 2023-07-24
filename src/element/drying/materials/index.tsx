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
import FormSetoran from './form';

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
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Bahan Pengeringan</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormSetoran />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BahanPengeringan;
