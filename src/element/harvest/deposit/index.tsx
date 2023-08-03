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
import FormSetoran from './form';
import TableSetoran from './table';
import {
  useDeleteSetoran,
  useGetSetoran,
  usePostSetoran,
  useUpdateSetoran,
} from '../../../hooks/useSetoran.hook';
import {
  TSchemaDeleteSetoran,
  TSchemaSetoran,
  TSchemaUpdateSetoran,
} from './schema';
import dayjs from 'dayjs';
import { tableAdapter } from './helper';

type TAction = {
  add?: boolean;
  update?: TSchemaUpdateSetoran;
  delete?: TSchemaDeleteSetoran;
};

const Setoran = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );
  const handleOpenModalUpdate = useCallback(
    (data: TSchemaUpdateSetoran) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TSchemaDeleteSetoran) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );
  const handleReset = useCallback(() => setAction(null), []);

  const cancelRef = useRef(null);

  const getSetoran = useGetSetoran();
  const postSetoran = usePostSetoran();
  const deleteSetoran = useDeleteSetoran();
  const updateSetoran = useUpdateSetoran();

  const handleSave = useCallback(
    (payload: TSchemaSetoran | TSchemaUpdateSetoran) => {
      const defaultPayload = {
        id_hasil_panen: payload.tanggal_panen,
        id_buruh: payload.id_buruh,
        volume_liter: payload.volume.replace('.', ''),
        berat_kg: payload.berat.replace('.', ''),
        upah_rp: payload.upah.replace('.', ''),
        waktu: dayjs(payload.tanggal).format('YYYY/MM/DD'),
        catatan: payload.catatan,
      };

      if ('id' in payload) {
        updateSetoran.mutate({ id: payload.id, ...defaultPayload });
      } else {
        postSetoran.mutate(defaultPayload);
      }
    },
    []
  );

  const handleDelete = useCallback(() => {
    if (action?.delete?.id) {
      deleteSetoran.mutate((action?.delete as TSchemaDeleteSetoran)?.id);
    }
  }, [action?.delete?.id]);

  useEffect(() => {
    if (
      postSetoran.isSuccess ||
      updateSetoran.isSuccess ||
      deleteSetoran.isSuccess
    ) {
      getSetoran.refetch();
    }
  }, [postSetoran.isSuccess, deleteSetoran.isSuccess, updateSetoran.isSuccess]);

  useEffect(() => {
    if (updateSetoran.isSuccess || deleteSetoran.isSuccess) {
      handleReset();
    }
  }, [deleteSetoran.isSuccess, updateSetoran.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button onClick={handleOpenModalAdd} variant="primary">
            Tambah
          </Button>
        </Box>
        <TableSetoran
          isLoading={getSetoran.isLoading}
          data={
            getSetoran.isSuccess
              ? tableAdapter(getSetoran?.data?.data?.data?.setoran)
              : []
          }
          onUpdate={handleOpenModalUpdate}
          onDelete={handleOpenModalDelete}
        />
      </VStack>

      <Modal
        isOpen={Boolean(action?.add) || Boolean(action?.update)}
        onClose={handleReset}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${
            action?.update ? 'Perbarui' : 'Tambah'
          } Setoran`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <FormSetoran
              initialValues={action?.update}
              isLoading={Boolean(
                postSetoran?.isLoading || updateSetoran.isLoading
              )}
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
              {`Delete ${dayjs(
                (action?.delete as TSchemaDeleteSetoran)?.nama
              ).format('DD MMMM YYYY')}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data setoran ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                isLoading={deleteSetoran.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={handleDelete}
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

export default Setoran;
