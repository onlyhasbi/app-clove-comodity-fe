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
import FormPenjualan from './form';
import TabelPenjualan from './table';

const Penjualan = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelPenjualan />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Penjualan</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormPenjualan />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Penjualan;
