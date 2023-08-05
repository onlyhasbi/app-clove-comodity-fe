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
import {
  useDeleteTim,
  useGetTim,
  usePostTim,
  useUpdateTim,
} from '../../../hooks/useTeam.hook';
import FormTim from './form';
import TabelTim from './table';
import { useCallback, useRef, useState, useEffect } from 'react';
import { TSchemaTim, TSchemaDeleteTim, TSchemaUpdateTim } from './schema';
import { tableAdapter } from './helper';

type TAction = {
  add?: boolean;
  update?: TSchemaUpdateTim;
  delete?: TSchemaDeleteTim;
};

const Tim = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const getTim = useGetTim();
  const postTim = usePostTim();
  const deleteTim = useDeleteTim();
  const updateTim = useUpdateTim();

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: TSchemaUpdateTim) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TSchemaDeleteTim) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: TSchemaTim | TSchemaUpdateTim) => {
    if ('id' in payload) {
      updateTim.mutate(payload);
    } else {
      postTim.mutate(payload);
    }
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (id) {
      deleteTim.mutate(id);
    }
  }, []);

  useEffect(() => {
    if (postTim.isSuccess || updateTim.isSuccess || deleteTim.isSuccess) {
      getTim.refetch();
    }
  }, [postTim.isSuccess, deleteTim.isSuccess, updateTim.isSuccess]);

  useEffect(() => {
    if (updateTim.isSuccess || deleteTim.isSuccess) {
      handleReset();
    }
  }, [updateTim.isSuccess, deleteTim.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={handleOpenModalAdd} variant="primary">
            Tambah
          </Button>
        </Box>
        <TabelTim
          isLoading={getTim.isLoading}
          data={
            getTim.isSuccess ? tableAdapter(getTim?.data?.data?.data?.tim) : []
          }
          onUpdate={handleOpenModalUpdate}
          onDelete={handleOpenModalDelete}
        />
      </VStack>

      <Modal
        isOpen={Boolean(action?.add) || Boolean(action?.update)}
        onClose={handleReset}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${
            action?.update ? 'Perbarui' : 'Tambah'
          } Tim Pengeringan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormTim
              onSave={handleSave}
              isLoading={postTim.isLoading || updateTim.isLoading}
              initialValues={action?.update}
              onClose={handleReset}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={Boolean(action?.delete)}
        leastDestructiveRef={cancelRef}
        onClose={handleReset}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Tim
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data tim pengeringan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                isLoading={deleteTim.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TSchemaDeleteTim).id)
                }
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

export default Tim;
