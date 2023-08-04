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
  TSchemaDeletePekerjaan,
  TSchemaPekerjaan,
  TSchemaUpdatePekerjaan,
} from '@/element/work/schema';
import {
  usePostWork,
  useGetWork,
  useUpdateWork,
  useDeleteWork,
} from '../../hooks/useWork.hook';
import { tableAdapter } from '../../element/work/helper';

type TAction = {
  update?: TSchemaUpdatePekerjaan;
  delete?: TSchemaDeletePekerjaan;
};

const Pekerjaan = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const handleUpdate = useCallback(
    (data: TSchemaUpdatePekerjaan) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TSchemaDeletePekerjaan) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const handleReset = useCallback(() => setAction(null), []);

  const cancelRef = useRef(null);

  const getWork = useGetWork();
  const postWork = usePostWork();
  const updateWork = useUpdateWork();
  const deleteWork = useDeleteWork();

  const handleSave = (payload: TSchemaPekerjaan | TSchemaUpdatePekerjaan) => {
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
    (id: string) => {
      if (action?.delete?.id) deleteWork.mutate(id);
    },
    [action?.delete?.id]
  );

  useEffect(() => {
    if (postWork.isSuccess || updateWork.isSuccess || deleteWork.isSuccess) {
      getWork.refetch();
    }
  }, [postWork.isSuccess, deleteWork.isSuccess, updateWork.isSuccess]);

  useEffect(() => {
    if (updateWork.isSuccess || deleteWork.isSuccess) {
      handleReset();
    }
  }, [deleteWork.isSuccess, updateWork.isSuccess, handleReset]);

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
            isLoading={getWork.isLoading}
            data={
              getWork.isSuccess
                ? tableAdapter(getWork?.data?.data?.data?.lowongan)
                : []
            }
            onUpdate={handleUpdate}
            onDelete={handleOpenModalDelete}
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
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete((action?.delete as TSchemaDeletePekerjaan)?.id);
                  handleReset();
                }}
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
