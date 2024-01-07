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
  useDeleteLand,
  useGetLands,
  usePostLand,
  useUpdateLand,
} from '../../../hooks/useLand.hook';
import { AddLand, DeleteLand, UpdateLand } from '../../../types/Land';
import { url } from '../../../utils/config/url';
import LandForm from './form';
import { tableAdapter } from './helper';
import LandTable from './table';
import useAction from '../../../hooks/useAction';

const Land = () => {
  const queryClient = useQueryClient();
  const cancelRef = useRef(null);

  const getLand = useGetLands();
  const postLand = usePostLand();
  const deleteLand = useDeleteLand();
  const updateLand = useUpdateLand();

  const {
    action,
    handleOpenModalAdd,
    handleOpenModalUpdate,
    handleOpenModalDelete,
    handleReset,
  } = useAction<UpdateLand, DeleteLand>();

  const lahan = getLand.isSuccess
    ? tableAdapter(getLand?.data?.data?.lahan)
    : [];

  const handleSave = useCallback((payload: AddLand | UpdateLand) => {
    const defaultPayload = {
      nama: payload.nama,
      lokasi: payload.kabupaten,
      luas_m2: payload.luas_lahan,
      status_hak_panen: payload.status_lahan,
    };

    if ('id' in payload) {
      updateLand.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postLand.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deleteLand.mutate(id),
    []
  );

  useEffect(() => {
    if (postLand.isSuccess || updateLand.isSuccess || deleteLand.isSuccess) {
      getLand.refetch();
      queryClient.refetchQueries({
        queryKey: [url.report_lahan.key],
        type: 'inactive',
      });
    }
  }, [postLand.isSuccess, deleteLand.isSuccess, updateLand.isSuccess]);

  useEffect(() => {
    if (updateLand.isSuccess || deleteLand.isSuccess) handleReset();
  }, [updateLand.isSuccess, deleteLand.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            colorScheme="green"
            isDisabled={getLand.isLoading}
            onClick={handleOpenModalAdd}
          >
            Tambah
          </Button>
        </Box>
        <LandTable
          isLoading={getLand.isLoading}
          data={lahan}
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
          } Land`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <LandForm
              initialValues={action?.update}
              isLoading={Boolean(postLand?.isLoading || updateLand.isLoading)}
              onClose={handleReset}
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
              {`Delete ${(action?.delete as DeleteLand)?.nama}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data lahan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteLand.isLoading}
              >
                Batal
              </Button>
              <Button
                isLoading={deleteLand.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() => handleDelete((action?.delete as DeleteLand)?.id)}
                ml={3}
              >
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Land;
