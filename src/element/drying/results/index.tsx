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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import FormHasilPengeringan from './form';
import TabelHasilPengeringan from './table';
import { TDelete, TUpdate } from './types';

type TAction = {
  add?: boolean;
  update?: TUpdate | boolean;
  delete?: TDelete | boolean;
};

const HasilPengeringan = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );
  const handleCloseModalAdd = useCallback(() => setAction({ add: false }), []);
  const handleOpenModalUpdate = useCallback(
    (data: TUpdate) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleCloseModalUpdate = useCallback(
    () => setAction({ update: false }),
    []
  );
  const handleOpenModalDelete = useCallback(
    (data: TDelete) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );
  const handleCloseModalDelete = useCallback(
    () => setAction({ delete: false }),
    []
  );

  const cancelRef = useRef(null);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={handleOpenModalAdd} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelHasilPengeringan
          onUpdate={handleOpenModalUpdate}
          onDelete={handleOpenModalDelete}
        />
      </VStack>

      <Modal
        isOpen={Boolean(action?.add) || Boolean(action?.update)}
        onClose={handleCloseModalAdd || handleCloseModalUpdate}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${
            action?.update ? 'Perbarui' : 'Tambah'
          } Hasil Pengeringan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormHasilPengeringan
              initialValues={action?.update}
              onClose={handleCloseModalAdd}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={Boolean(action?.delete)}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseModalDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Delete ${(action?.delete as TDelete)?.tim}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data hasil pengeringan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseModalDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log((action?.delete as TDelete)?.id);
                  handleCloseModalDelete();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default HasilPengeringan;
