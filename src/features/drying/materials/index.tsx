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
import FormBahan from './form';
import TabelBahan from './table';
import { TAddBahan, TDeleteBahan, TUpdateBahan } from './schema';
import {
  useDeleteMaterial,
  useGetMaterial,
  usePostMaterial,
  useUpdateMaterial,
} from '../../../hooks/useMaterial.hook';
import dayjs from 'dayjs';
import { tableAdapter } from './helper';
import { useQueryClient } from '@tanstack/react-query';
import { url } from '../../../utils/config/url';

type TAction = {
  add?: boolean;
  update?: TUpdateBahan;
  delete?: TDeleteBahan;
};

const BahanPengeringan = () => {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const getMaterial = useGetMaterial();
  const postMaterial = usePostMaterial();
  const deleteMaterial = useDeleteMaterial();
  const updateMaterial = useUpdateMaterial();

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );
  const handleOpenModalUpdate = useCallback(
    (data: TUpdateBahan) => setAction((prev) => ({ ...prev, update: data })),
    []
  );
  const handleOpenModalDelete = useCallback(
    (data: TDeleteBahan) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );
  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: TAddBahan | TUpdateBahan) => {
    const defaultPayload = {
      berat_kg: payload.berat_kg,
      volume_liter: payload.volume_liter,
      dikeringkan_pada_hari: dayjs(payload.waktu_mulai).format('YYYY/MM/DD'),
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updateMaterial.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postMaterial.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => deleteMaterial.mutate(id),
    []
  );

  useEffect(() => {
    if (
      postMaterial.isSuccess ||
      updateMaterial.isSuccess ||
      deleteMaterial.isSuccess
    ) {
      getMaterial.refetch();
      queryClient.refetchQueries({
        queryKey: [url.report_komoditas.key],
        type: 'inactive',
      });
    }
  }, [
    postMaterial.isSuccess,
    deleteMaterial.isSuccess,
    updateMaterial.isSuccess,
  ]);

  useEffect(() => {
    if (updateMaterial.isSuccess || deleteMaterial.isSuccess) {
      handleReset();
    }
  }, [updateMaterial.isSuccess, deleteMaterial.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            isDisabled={getMaterial.isLoading}
            onClick={handleOpenModalAdd}
            colorScheme="green"
          >
            Tambah
          </Button>
        </Box>
        <TabelBahan
          isLoading={getMaterial.isLoading}
          data={
            getMaterial.isSuccess
              ? tableAdapter(getMaterial?.data?.data?.data?.bahan)
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
          } Bahan Pengeringan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormBahan
              isLoading={postMaterial.isLoading || updateMaterial.isLoading}
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
              Delete Bahan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data bahan pengeringan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteMaterial.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteMaterial.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeleteBahan)?.id)
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

export default BahanPengeringan;