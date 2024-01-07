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
import { useCallback, useRef, useEffect } from 'react';
import DryingResultForm from './form';
import DryingResultTable from './table';
import {
  useDeleteDryResult,
  useGetDryResult,
  usePostDryResult,
  useUpdateDryResult,
  useUpdatePayment,
  useUpdateMaterial,
} from '../../../hooks/useDryResult.hook';
import { tableAdapter } from './helper';
import { toast } from 'react-hot-toast';
import { url } from '../../../utils/config/url';
import { useQueryClient } from '@tanstack/react-query';
import {
  UpdateStatusPayment,
  AddDryResult,
  DeleteDryResult,
  UpdateDryResult,
} from '../../../types/DryResult';
import useAction from '../../../hooks/useAction';

const DryResult = () => {
  const queryClient = useQueryClient();
  const cancelRef = useRef(null);

  const getDryResult = useGetDryResult();
  const postDryResult = usePostDryResult();
  const deleteDryResult = useDeleteDryResult();
  const updateDryResult = useUpdateDryResult();
  const updateStatusPayment = useUpdatePayment();
  const updateMaterial = useUpdateMaterial();

  const {
    action,
    handleOpenModalAdd,
    handleOpenModalUpdate,
    handleOpenModalDelete,
    handleReset,
  } = useAction<UpdateDryResult, DeleteDryResult>();

  const handleSave = useCallback((payload: AddDryResult | UpdateDryResult) => {
    const defaultPayload = {
      id_tim: payload.tim,
      berat_kg: +payload.berat,
      volume_liter: +payload.volume,
      kering_pada_hari: payload.tanggal,
      catatan: payload.catatan,
      upah: +payload.upah,
    };

    if ('id' in payload) {
      updateDryResult.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postDryResult.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => deleteDryResult.mutate(id),
    []
  );

  const handleUpdatePayment = useCallback((props: UpdateStatusPayment) => {
    toast.loading('Memproses pembayaran...');
    updateStatusPayment.mutate(props);
  }, []);

  const handleUpdateMaterial = useCallback(
    ({ id_bahan, id_hasil }: TUpdateMaterial) => {
      updateMaterial.mutate({ id_bahan, id_hasil });
    },
    []
  );

  const tableListener = {
    isLoading: getDryResult.isLoading,
    data: getDryResult.isSuccess
      ? tableAdapter(getDryResult?.data?.data?.hasil)
      : [],
    onUpdateMaterial: handleUpdateMaterial,
    onUpdatePayment: handleUpdatePayment,
    onUpdate: handleOpenModalUpdate,
    onDelete: handleOpenModalDelete,
  };

  useEffect(() => {
    if (
      postDryResult.isSuccess ||
      updateDryResult.isSuccess ||
      deleteDryResult.isSuccess ||
      updateStatusPayment.isSuccess ||
      updateMaterial.isSuccess
    ) {
      getDryResult.refetch();
      queryClient.refetchQueries({
        queryKey: [url.report_pengeringan.key],
        type: 'inactive',
      });
      queryClient.refetchQueries({
        queryKey: [url.report_komoditas.key],
        type: 'inactive',
      });
    }
  }, [
    postDryResult.isSuccess,
    deleteDryResult.isSuccess,
    updateDryResult.isSuccess,
    updateStatusPayment.isSuccess,
    updateMaterial.isSuccess,
  ]);

  useEffect(() => {
    if (updateDryResult.isSuccess || deleteDryResult.isSuccess) {
      handleReset();
    }
  }, [updateDryResult.isSuccess, deleteDryResult.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getDryResult.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <DryingResultTable listen={tableListener} />
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
            <DryingResultForm
              isLoading={postDryResult.isLoading || updateDryResult.isLoading}
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
                isDisabled={deleteDryResult.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteDryResult.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as DeleteDryResult)?.id)
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

export default DryResult;
