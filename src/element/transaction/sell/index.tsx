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
import FormPenjualan from './form';
import TabelPenjualan from './table';
import {
  usePostPenjualan,
  useGetPenjualan,
  useUpdatePenjualan,
  useDeletePenjualan,
} from '../../../hooks/useSell.hook';
import { TDeletePenjualan, TUpdatePenjualan } from './schema';
import { tableAdapter } from './helper';

type TAction = {
  add?: boolean;
  update?: TUpdatePenjualan;
  delete?: TDeletePenjualan;
};

const Penjualan = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: TUpdatePenjualan) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePenjualan) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const postPenjualan = usePostPenjualan();
  const updatePenjualan = useUpdatePenjualan();
  const deletePenjualan = useDeletePenjualan();
  const getPenjualan = useGetPenjualan();

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: any) => {
    const defaultPayload = {
      id_pembeli: payload.id_pembeli,
      jenis_komditas_cengkeh: payload.jenis_komoditas,
      berat_kg: payload.berat_kg,
      harga_rp: payload.harga_rp,
      waktu: payload.tanggal,
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updatePenjualan.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postPenjualan.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deletePenjualan.mutate(id),
    []
  );

  useEffect(() => {
    if (
      postPenjualan.isSuccess ||
      updatePenjualan.isSuccess ||
      deletePenjualan.isSuccess
    )
      getPenjualan.refetch();
  }, [
    postPenjualan.isSuccess,
    deletePenjualan.isSuccess,
    updatePenjualan.isSuccess,
  ]);

  useEffect(() => {
    if (updatePenjualan.isSuccess || deletePenjualan.isSuccess) handleReset();
  }, [updatePenjualan.isSuccess, deletePenjualan.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getPenjualan.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <TabelPenjualan
          data={
            getPenjualan.isSuccess
              ? tableAdapter(getPenjualan?.data?.data?.data?.penjualan)
              : []
          }
          isLoading={getPenjualan.isLoading}
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
          } Penjualan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormPenjualan
              isLoading={postPenjualan.isLoading || updatePenjualan.isLoading}
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
              Delete Penjualan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data penjualan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                isLoading={deletePenjualan.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeletePenjualan)?.id)
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

export default Penjualan;
