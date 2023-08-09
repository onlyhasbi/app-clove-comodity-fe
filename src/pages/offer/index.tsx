import FormPenawaran from '../../element/offer/form';
import TabelPenawaran from '../../element/offer/table';
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
  usePostOffer,
  useGetOffer,
  useUpdateOffer,
  useDeleteOffer,
} from '../../hooks/useOffer.hook';
import { tableAdapter } from '../../element/offer/helper';
import { TDeletePenawaran, TUpdatePenawaran } from '@/element/offer/schema';
import { useQueryClient } from '@tanstack/react-query';
import { url } from '../..//utils/config/url';

type TAction = {
  update?: TUpdatePenawaran;
  delete?: TDeletePenawaran;
};

const Penawaran = () => {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<TAction | null>(null);
  const cancelRef = useRef(null);

  const handleUpdate = useCallback(
    (data: TUpdatePenawaran) =>
      setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDeletePenawaran) =>
      setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const postOffer = usePostOffer();
  const deleteOffer = useDeleteOffer();
  const updateOffer = useUpdateOffer();
  const getOffer = useGetOffer();

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = useCallback((payload: any) => {
    const defaultPayload = {
      jenis_penawaran: payload.jenis_penawaran,
      jenis_komoditas: payload.komoditas,
      max: payload.berat_max,
      min: payload.berat_min,
      satuan: payload.satuan,
      harga_rp: payload.harga,
      catatan: payload.catatan,
    };
    if ('id' in payload) {
      updateOffer.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postOffer.mutate(defaultPayload);
    }
  }, []);

  const handleDelete = useCallback(
    (id: string) => id && deleteOffer.mutate(id),
    []
  );

  useEffect(() => {
    if (postOffer.isSuccess || updateOffer.isSuccess || deleteOffer.isSuccess) {
      getOffer.refetch();
      queryClient.refetchQueries({
        queryKey: [url.info_penawaran.key],
        type: 'inactive',
      });
      handleReset();
    }
  }, [
    postOffer.isSuccess,
    deleteOffer.isSuccess,
    updateOffer.isSuccess,
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
            Penawaran Komoditas
          </Text>
          <Text
            as="h2"
            fontSize="sm"
            w="full"
            fontWeight={500}
            letterSpacing="0.02rem"
            textAlign="left"
          >
            Tingkatkan profit dengan menawarkan komoditasmu
          </Text>
        </Box>
        <FormPenawaran
          isLoading={postOffer.isLoading || updateOffer.isLoading}
          onSave={handleSave}
          onReset={handleReset}
          initialValues={action?.update}
        />
        <Box marginTop={6}>
          <TabelPenawaran
            data={
              getOffer.isSuccess
                ? tableAdapter(getOffer?.data?.data?.data?.lamaran)
                : []
            }
            isLoading={getOffer.isLoading}
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
              {`Delete Penawaran`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data penawaran ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteOffer.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteOffer.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() =>
                  handleDelete((action?.delete as TDeletePenawaran)?.id)
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

export default Penawaran;
