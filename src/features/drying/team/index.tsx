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
import {
  useDeleteTeam,
  useGetTeam,
  usePostTeam,
  useUpdateTeam,
} from '../../../hooks/useTeam.hook';
import TeamForm from './form';
import TeamTable from './table';
import { useCallback, useRef, useEffect } from 'react';
import { AddTeam, DeleteTeam, UpdateTeam } from '../../../types/Team';
import { tableAdapter } from './helper';
import useAction from '../../../hooks/useAction';

const Team = () => {
  const cancelRef = useRef(null);

  const getTeam = useGetTeam();
  const postTeam = usePostTeam();
  const deleteTeam = useDeleteTeam();
  const updateTeam = useUpdateTeam();

  const {
    action,
    handleOpenModalAdd,
    handleOpenModalUpdate,
    handleOpenModalDelete,
    handleReset,
  } = useAction<UpdateTeam, DeleteTeam>();

  const handleSave = useCallback((payload: AddTeam | UpdateTeam) => {
    if ('id' in payload) {
      updateTeam.mutate(payload);
    } else {
      postTeam.mutate(payload);
    }
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (id) {
      deleteTeam.mutate(id);
    }
  }, []);

  useEffect(() => {
    if (postTeam.isSuccess || updateTeam.isSuccess || deleteTeam.isSuccess) {
      getTeam.refetch();
    }
  }, [postTeam.isSuccess, deleteTeam.isSuccess, updateTeam.isSuccess]);

  useEffect(() => {
    if (updateTeam.isSuccess || deleteTeam.isSuccess) {
      handleReset();
    }
  }, [updateTeam.isSuccess, deleteTeam.isSuccess, handleReset]);

  return (
    <>
      <VStack direction="column">
        <Box width="100%" marginY={3}>
          <Button
            isDisabled={getTeam.isLoading}
            onClick={handleOpenModalAdd}
            colorScheme="green"
          >
            Tambah
          </Button>
        </Box>
        <TeamTable
          isLoading={getTeam.isLoading}
          data={getTeam.isSuccess ? tableAdapter(getTeam?.data?.data?.tim) : []}
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
          } Tim Pengeringan`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={5}>
            <TeamForm
              onSave={handleSave}
              isLoading={postTeam.isLoading || updateTeam.isLoading}
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
              Delete Tim
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data tim pengeringan ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={handleReset}
                isDisabled={deleteTeam.isLoading}
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteTeam.isLoading}
                loadingText="Menghapus..."
                spinnerPlacement="start"
                colorScheme="red"
                onClick={() => handleDelete((action?.delete as DeleteTeam).id)}
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

export default Team;
