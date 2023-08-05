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
import { TSchemaBahan, TSchemaDeleteBahan, TSchemaUpdateBahan } from './schema';
import {
  useDeleteMaterial,
  useGetMaterial,
  usePostMaterial,
  useUpdateMaterial,
} from '../../../hooks/useMaterial.hook';
import dayjs from 'dayjs';
import { tableAdapter } from './helper';

type TAction = {
  add?: boolean;
  update?: TSchemaUpdateBahan;
  delete?: TSchemaDeleteBahan;
};

const BahanPengeringan = () => {
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
    (data: TSchemaUpdateBahan) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );
  const handleOpenModalDelete = useCallback(
    (data: TSchemaDeleteBahan) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );
  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback(
    (payload: TSchemaBahan | TSchemaUpdateBahan) => {
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
    },
    []
  );

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
          <Button onClick={handleOpenModalAdd} variant="primary">
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
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                isLoading={deleteMaterial.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TSchemaDeleteBahan)?.id)
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
