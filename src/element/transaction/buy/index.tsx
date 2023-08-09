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
import FormPembelian from './form';
import TabelPembelian from './table';
import {
  usePostPembelian,
  useGetPembelian,
  useUpdatePembelian,
  useDeletePembelian,
} from '../../../hooks/useBuy.hook';
import { url } from '../../..//utils/config/url';
import { TDeletePembelian, TUpdatePembelian } from './schema';
import { tableAdapter } from './helper';
import { useQueryClient } from '@tanstack/react-query';

type TAction = {
  add?: boolean;
  update?: TUpdatePembelian;
  delete?: TDeletePembelian;
};

const Pembelian = () => {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: TUpdatePembelian) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePembelian) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const postPembelian = usePostPembelian();
  const updatePembelian = useUpdatePembelian();
  const deletePembelian = useDeletePembelian();
  const getPembelian = useGetPembelian();

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: any) => {
    const defaultPayload = {
      id_penjual: payload.id_penjual,
      jenis_komditas_cengkeh: payload.jenis_komoditas,
      berat_kg: payload.berat_kg,
      harga_rp: payload.harga_rp,
      waktu: payload.tanggal,
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updatePembelian.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postPembelian.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deletePembelian.mutate(id),
    []
  );

  useEffect(() => {
    if (
      postPembelian.isSuccess ||
      updatePembelian.isSuccess ||
      deletePembelian.isSuccess
    ) {
      getPembelian.refetch();
      queryClient.refetchQueries({
        queryKey: [url.report_transaksi.key],
        type: 'inactive',
      });
    }
  }, [
    postPembelian.isSuccess,
    deletePembelian.isSuccess,
    updatePembelian.isSuccess,
  ]);

  useEffect(() => {
    if (updatePembelian.isSuccess || deletePembelian.isSuccess) handleReset();
  }, [updatePembelian.isSuccess, deletePembelian.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getPembelian.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <TabelPembelian
          data={
            getPembelian.isSuccess
              ? tableAdapter(getPembelian?.data?.data?.data?.pembelian)
              : []
          }
          isLoading={getPembelian.isLoading}
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
          } Pembelian`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormPembelian
              isLoading={postPembelian.isLoading || updatePembelian.isLoading}
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
              Delete Pembelian
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data pembelian ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deletePembelian.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deletePembelian.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeletePembelian)?.id)
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

export default Pembelian;
