import FormPekerjaan from '../../element/work/form';
import TabelPekerjaan from '../../element/work/table';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { useCallback, useRef, useState, useEffect } from 'react';
import {
  TDeletePekerjaan,
  TAddPekerjaan,
  TUpdatePekerjaan,
} from '@/element/work/schema';
import {
  usePostWork,
  useGetWork,
  useUpdateWork,
  useDeleteWork,
  useUpdateActive,
} from '../../hooks/useWork.hook';
import { tableAdapter } from '../../element/work/helper';
import { toast } from 'react-hot-toast';

type TAction = {
  update?: TUpdatePekerjaan;
  delete?: TDeletePekerjaan;
};

const Pekerjaan = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleUpdate = useCallback(
    (data: TUpdatePekerjaan) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePekerjaan) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const getWork = useGetWork();
  const postWork = usePostWork();
  const updateWork = useUpdateWork();
  const deleteWork = useDeleteWork();
  const updateActive = useUpdateActive();

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = (payload: TAddPekerjaan | TUpdatePekerjaan) => {
    const defaultPayload = {
      jenis_pekerjaan: payload.nama_pekerjaan,
      upah_rp: +payload.upah,
      indikator_ukur: payload.satuan,
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updateWork.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postWork.mutate(defaultPayload);
    }
  };

  const handleDelete = useCallback(
    (id: string) => id && deleteWork.mutate(id),
    []
  );

  const handleUpdateStatus = useCallback((updateStatus: UpdateStatus) => {
    updateActive.mutate(updateStatus);
    toast.loading('Memperbarui status lowongan kerja...');
  }, []);

  useEffect(() => {
    if (
      postWork.isSuccess ||
      updateWork.isSuccess ||
      deleteWork.isSuccess ||
      updateActive.isSuccess
    ) {
      getWork.refetch();
      toast.dismiss();
      handleReset();
    }
  }, [
    postWork.isSuccess,
    deleteWork.isSuccess,
    updateWork.isSuccess,
    updateActive.isSuccess,
    handleReset,
  ]);

  return (
    <>
      <Stack
        direction="column"
        spacing="2rem"
        paddingX={10}
        marginTop={5}
        paddingBottom="5rem"
      >
        <Box w="full">
          <Text
            as="h2"
            fontSize="xl"
            w="full"
            fontWeight={700}
            letterSpacing="-0.01rem"
            textAlign="left"
            color="green.600"
          >
            Dapatkan Buruh
          </Text>
          <Text
            as="h2"
            fontSize="sm"
            w="full"
            fontWeight={500}
            letterSpacing="0.02rem"
            textAlign="left"
          >
            Dapatkan buruh dengan menambah pekerjaan baru
          </Text>
        </Box>
        <FormPekerjaan
          isLoading={postWork.isLoading || updateWork.isLoading}
          onSave={handleSave}
          onReset={handleReset}
          initialValues={action?.update}
        />
        <Box marginTop={6}>
          <TabelPekerjaan
            data={
              getWork.isSuccess
                ? tableAdapter(getWork?.data?.data?.data?.lowongan)
                : []
            }
            isLoading={getWork.isLoading}
            onUpdate={handleUpdate}
            onDelete={handleOpenModalDelete}
            onUpdateStatus={handleUpdateStatus}
          />
        </Box>
      </Stack>
      <AlertDialog
        isOpen={Boolean(action?.delete)}
        leastDestructiveRef={cancelRef}
        onClose={handleReset}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Pekerjaan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data pekerjaan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteWork.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteWork.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeletePekerjaan)?.id)
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

export default Pekerjaan;
