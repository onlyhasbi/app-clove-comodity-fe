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
import FormPembelian from './form';
import TabelPembelian from './table';

const Pembelian = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelPembelian />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pembelian</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormPembelian />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Pembelian;
