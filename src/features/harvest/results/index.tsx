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
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useDeleteHasil,
  useGetHasil,
  usePostHasil,
  useUpdateHasil,
} from '../../../hooks/useResult.hook';
import { url } from '../../../utils/config/url';
import FormHasil from './form';
import { tableAdapter } from './helper';
import { TAddPanen, TDeletePanen, TUpdatePanen } from './schema';
import TableHasil from './table';

type TAction = {
  add?: boolean;
  update?: TUpdatePanen;
  delete?: TDeletePanen;
};

const Hasil = () => {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: TUpdatePanen) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePanen) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const getHasil = useGetHasil();
  const postHasil = usePostHasil();
  const deleteHasil = useDeleteHasil();
  const updateHasil = useUpdateHasil();

  const hasilPanen = getHasil.isSuccess
    ? tableAdapter(getHasil?.data?.data?.hasil_panen)
    : [];

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: TAddPanen | TUpdatePanen) => {
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
  }, []);

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
        <TableHasil
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
            <FormHasil
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
              {`Delete ${(action?.delete as TDeletePanen)?.nama}`}
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
                  handleDelete((action?.delete as TDeletePanen)?.id)
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

export default Hasil;
