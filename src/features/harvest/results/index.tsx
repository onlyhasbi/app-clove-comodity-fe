import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import {
  useDeleteHasil,
  useGetHasil,
  usePostHasil,
  useUpdateHasil,
} from '../../../hooks/useResult.hook';
import { url } from '../../../utils/config/url';
import HarvestResultForm from './form';
import { tableAdapter } from './helper';
import {
  AddHarvestResult,
  DeleteHarvestResult,
  UpdateHarvestResult,
} from '../../../types/HarvestResult';
import HarvestResultTable from './table';
import useAction from '../../../hooks/useAction';

const HarvestResult = () => {
  const queryClient = useQueryClient();
  const cancelRef = useRef(null);

  const getHasil = useGetHasil();
  const postHasil = usePostHasil();
  const deleteHasil = useDeleteHasil();
  const updateHasil = useUpdateHasil();

  const {
    action,
    handleOpenModalAdd,
    handleOpenModalUpdate,
    handleOpenModalDelete,
    handleReset,
  } = useAction<UpdateHarvestResult, DeleteHarvestResult>();

  const hasilPanen = getHasil.isSuccess
    ? tableAdapter(getHasil?.data?.data?.hasil_panen)
    : [];

  const handleSave = useCallback(
    (payload: AddHarvestResult | UpdateHarvestResult) => {
      const defaultPayload = {
        id_lahan: payload.lahan,
        berat_pengukuran_kg: payload.berat,
        volume_pengukuran_liter: payload.volume,
        waktu: payload.tanggal,
        catatan: payload.catatan,
      };

      if ('id' in payload) {
        updateHasil.mutate({ id: payload.id, ...defaultPayload });
      } else {
        postHasil.mutate(defaultPayload);
      }
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => id && deleteHasil.mutate(id),
    []
  );

  useEffect(() => {
    if (postHasil.isSuccess || updateHasil.isSuccess || deleteHasil.isSuccess) {
      getHasil.refetch();
      queryClient.refetchQueries({
        queryKey: [url.lahan.key],
        type: 'active',
      });
      queryClient.refetchQueries({
        queryKey: [url.report_komoditas.key],
        type: 'inactive',
      });
    }
  }, [postHasil.isSuccess, deleteHasil.isSuccess, updateHasil.isSuccess]);

  useEffect(() => {
    if (updateHasil.isSuccess || deleteHasil.isSuccess) {
      handleReset();
    }
  }, [deleteHasil.isSuccess, updateHasil.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getHasil.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <HarvestResultTable
          isLoading={getHasil.isLoading}
          data={hasilPanen}
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
          } Hasil Panen`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <HarvestResultForm
              initialValues={action?.update}
              onClose={handleReset}
              isLoading={postHasil.isLoading || updateHasil.isLoading}
              onSave={handleSave}
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
              {`Delete ${(action?.delete as DeleteHarvestResult)?.nama}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data hasil panen ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteHasil.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteHasil.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as DeleteHarvestResult)?.id)
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

export default HarvestResult;
