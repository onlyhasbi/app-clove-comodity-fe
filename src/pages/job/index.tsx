import JobForm from '../../features/job/form';
import JobTable from '../../features/job/table';
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
  usePostJob,
  useGetJob,
  useUpdateJob,
  useDeleteJob,
  useUpdateActive,
} from '../../hooks/useJob.hook';
import { tableAdapter } from '../../features/job/helper';
import { toast } from 'react-hot-toast';
import { AddJob, UpdateJob, DeleteJob } from '../../types/Job';

type ActionState = {
  update?: UpdateJob;
  delete?: DeleteJob;
};

const JobPage = () => {
  const [action, setAction] = useState<ActionState | null>(null);
  const cancelRef = useRef(null);

  const handleUpdate = useCallback(
    (data: UpdateJob) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: DeleteJob) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const getJob = useGetJob();
  const postJob = usePostJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const updateActive = useUpdateActive();

  const handleReset = useCallback(() => setAction(null), []);

  const handleSave = (payload: AddJob | UpdateJob) => {
    const defaultPayload = {
      jenis_pekerjaan: payload.nama_pekerjaan,
      upah_rp: +payload.upah,
      indikator_ukur: payload.satuan,
      catatan: payload.catatan,
    };

    if ('id' in payload) {
      updateJob.mutate({ id: payload.id, ...defaultPayload });
    } else {
      postJob.mutate(defaultPayload);
    }
  };

  const handleDelete = useCallback(
    (id: string) => id && deleteJob.mutate(id),
    []
  );

  const handleUpdateStatus = useCallback((updateStatus: UpdateStatus) => {
    updateActive.mutate(updateStatus);
    toast.loading('Memperbarui status lowongan kerja...');
  }, []);

  useEffect(() => {
    if (
      postJob.isSuccess ||
      updateJob.isSuccess ||
      deleteJob.isSuccess ||
      updateActive.isSuccess
    ) {
      getJob.refetch();
      toast.dismiss();
      handleReset();
    }
  }, [
    postJob.isSuccess,
    deleteJob.isSuccess,
    updateJob.isSuccess,
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
        <JobForm
          isLoading={postJob.isLoading || updateJob.isLoading}
          onSave={handleSave}
          onReset={handleReset}
          initialValues={action?.update}
        />
        <Box marginTop={6}>
          <JobTable
            data={
              getJob.isSuccess ? tableAdapter(getJob?.data?.data?.lowongan) : []
            }
            isLoading={getJob.isLoading}
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
                isDisabled={deleteJob.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteJob.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() => handleDelete((action?.delete as DeleteJob)?.id)}
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

export default JobPage;
