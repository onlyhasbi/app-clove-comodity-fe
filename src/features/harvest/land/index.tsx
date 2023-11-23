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
  useDeleteLahan,
  useGetLahan,
  usePostLahan,
  useUpdateLahan,
} from '../../../hooks/useLand.hook';
import { url } from '../../../utils/config/url';
import LandForm from './form';
import { tableAdapter } from './helper';
import { TAddLahan, TDeleteLahan, TUpdateLahan } from './schema';
import LandTable from './table';

type TAction = {
  add?: boolean;
  update?: TUpdateLahan;
  delete?: TDeleteLahan;
};

const Land = () => {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );
  const handleOpenModalUpdate = useCallback(
    (data: TUpdateLahan) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeleteLahan) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const getLahan = useGetLahan();
  const postLahan = usePostLahan();
  const deleteLahan = useDeleteLahan();
  const updateLahan = useUpdateLahan();

  const lahan = getLahan.isSuccess
    ? tableAdapter(getLahan?.data?.data?.lahan)
    : [];

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: TAddLahan | TUpdateLahan) => {
    const defaultPayload = {
      nama: payload.nama,
      lokasi: payload.kabupaten,
      luas_m2: payload.luas_lahan,
      status_hak_panen: payload.status_lahan,
    };

    if ('id' in payload) {
      updateLahan.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postLahan.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deleteLahan.mutate(id),
    []
  );

  useEffect(() => {
    if (postLahan.isSuccess || updateLahan.isSuccess || deleteLahan.isSuccess) {
      getLahan.refetch();
      queryClient.refetchQueries({
        queryKey: [url.report_lahan.key],
        type: 'inactive',
      });
    }
  }, [postLahan.isSuccess, deleteLahan.isSuccess, updateLahan.isSuccess]);

  useEffect(() => {
    if (updateLahan.isSuccess || deleteLahan.isSuccess) handleReset();
  }, [updateLahan.isSuccess, deleteLahan.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            onClick={handleOpenModalAdd}
            colorScheme="green"
            isDisabled={getLahan.isLoading}
          >
            Tambah
          </Button>
        </Box>
        <LandTable
          isLoading={getLahan.isLoading}
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
          } Lahan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <LandForm
              initialValues={action?.update}
              isLoading={Boolean(postLahan?.isLoading || updateLahan.isLoading)}
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
              {`Delete ${(action?.delete as TDeleteLahan)?.nama}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data lahan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteLahan.isLoading}
              >
                Batal
              </Button>
              <Button
                isLoading={deleteLahan.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeleteLahan)?.id)
                }
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
