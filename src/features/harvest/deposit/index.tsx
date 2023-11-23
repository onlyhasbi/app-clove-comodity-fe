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
import DepositForm from './form';
import DepositTable from './table';
import {
  useDeleteSetoran,
  useGetSetoran,
  usePostSetoran,
  useUpdateSetoran,
  useUpdateStatusSetoran,
} from '../../../hooks/useDeposit.hook';
import { TDeleteSetoran, TAddSetoran, TUpdateSetoran } from './schema';
import dayjs from 'dayjs';
import { tableAdapter } from './helper';
import { toast } from 'react-hot-toast';
import { TUpdateStatusPayment } from '../../../types/DryResult';

type TAction = {
  add?: boolean;
  update?: TUpdateSetoran;
  delete?: TDeleteSetoran;
};

const Deposit = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const getSetoran = useGetSetoran();
  const postSetoran = usePostSetoran();
  const deleteSetoran = useDeleteSetoran();
  const updateSetoran = useUpdateSetoran();
  const updateStatusSetoran = useUpdateStatusSetoran();

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );
  const handleOpenModalUpdate = useCallback(
    (data: TUpdateSetoran) => setAction((prev) => ({ ...prev, update: data })),
    []
  );
  const handleOpenModalDelete = useCallback(
    (data: TDeleteSetoran) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );
  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: TAddSetoran | TUpdateSetoran) => {
    const defaultPayload = {
      id_hasil_panen: payload.tanggal_panen,
      id_buruh: payload.id_buruh,
      volume_liter: payload.volume,
      berat_kg: payload.berat,
      upah_rp: payload.upah,
      waktu: payload.tanggal,
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updateSetoran.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postSetoran.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deleteSetoran.mutate(id),
    []
  );

  const handleUpdatePembayaran = useCallback((props: TUpdateStatusPayment) => {
    toast.loading('Memproses pembayaran...');
    updateStatusSetoran.mutate(props);
  }, []);

  const tableListener = {
    statusSetoran: getSetoran.status,
    data: getSetoran.isSuccess
      ? tableAdapter(getSetoran?.data?.data?.setoran)
      : [],
    onUpdatePayment: handleUpdatePembayaran,
    onUpdate: handleOpenModalUpdate,
    onDelete: handleOpenModalDelete,
  };

  useEffect(() => {
    if (
      postSetoran.isSuccess ||
      updateSetoran.isSuccess ||
      deleteSetoran.isSuccess ||
      updateStatusSetoran.isSuccess
    ) {
      getSetoran.refetch();
    }
  }, [
    postSetoran.isSuccess,
    deleteSetoran.isSuccess,
    updateStatusSetoran.isSuccess,
    updateSetoran.isSuccess,
  ]);

  useEffect(() => {
    if (updateSetoran.isSuccess || deleteSetoran.isSuccess) {
      handleReset();
    }
  }, [updateSetoran.isSuccess, deleteSetoran.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getSetoran.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <DepositTable listen={tableListener} />
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
            <DepositForm
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
              {`Delete ${dayjs((action?.delete as TDeleteSetoran)?.nama).format(
                'DD MMMM YYYY'
              )}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data setoran ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteSetoran.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteSetoran.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeleteSetoran)?.id)
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

export default Deposit;
