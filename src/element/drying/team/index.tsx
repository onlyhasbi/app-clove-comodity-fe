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
import FormTim from './form';
import TabelTim from './table';

const Tim = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelTim />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tim Pengeringan</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormTim />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tim;
