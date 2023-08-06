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
import { useCallback, useRef, useState, useEffect } from 'react';
import FormHasilPengeringan from './form';
import TabelHasilPengeringan from './table';
import {
  TAddPengeringan,
  TDeletePengeringan,
  TUpdatePengeringan,
} from './schema';
import {
  useDeletePengeringan,
  useGetPengeringan,
  usePostPengeringan,
  useUpdatePengeringan,
} from '../../../hooks/useDryResult.hook';
import { tableAdapter } from './helper';

type TAction = {
  add?: boolean;
  update?: TUpdatePengeringan;
  delete?: TDeletePengeringan;
};

const HasilPengeringan = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const getPengeringan = useGetPengeringan();
  const postPengeringan = usePostPengeringan();
  const deletePengeringan = useDeletePengeringan();
  const updatePengeringan = useUpdatePengeringan();

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: TUpdatePengeringan) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePengeringan) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  // const handlePaid = useCallback(()=>{},[])


  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback(
    (payload: TAddPengeringan | TUpdatePengeringan) => {
      const defaultPayload = {
        id_tim: payload.tim,
        berat_kg: +payload.berat,
        volume_liter: +payload.volume,
        kering_pada_hari: payload.tanggal,
        catatan: payload.catatan,
        upah: +payload.upah,
      };

      if ('id' in payload) {
        updatePengeringan.mutate({ id: payload.id, ...defaultPayload });
      } else {
        postPengeringan.mutate(defaultPayload);
      }
    },
    []
  );


  const handleDelete = useCallback(
    (id: string) => deletePengeringan.mutate(id),
    []
  );

  useEffect(() => {
    if (
      postPengeringan.isSuccess ||
      updatePengeringan.isSuccess ||
      deletePengeringan.isSuccess
    ) {
      getPengeringan.refetch();
    }
  }, [
    postPengeringan.isSuccess,
    deletePengeringan.isSuccess,
    updatePengeringan.isSuccess,
  ]);

  useEffect(() => {
    if (updatePengeringan.isSuccess || deletePengeringan.isSuccess) {
      handleReset();
    }
  }, [updatePengeringan.isSuccess, deletePengeringan.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getPengeringan.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <TabelHasilPengeringan
          isLoading={getPengeringan.isLoading}
          data={
            getPengeringan.isSuccess
              ? tableAdapter(getPengeringan?.data?.data?.data?.hasil)
              : []
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
          } Hasil Pengeringan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormHasilPengeringan
              isLoading={
                postPengeringan.isLoading || updatePengeringan.isLoading
              }
              onSave={handleSave}
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
              Delete Hasil Pengeringan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data hasil pengeringan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deletePengeringan.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deletePengeringan.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeletePengeringan)?.id)
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

export default HasilPengeringan;
