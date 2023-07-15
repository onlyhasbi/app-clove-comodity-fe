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
import TableSetoran from './table';

const Setoran = () => {
  const [isShow, toggle] = useReducer((o) => !o, false);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={toggle} variant="primary">
            Tambah
          </Button>
        </Box>
        <TableSetoran />
      </VStack>

      <Modal isOpen={isShow} onClose={toggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Setoran</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormSetoran />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Setoran;
