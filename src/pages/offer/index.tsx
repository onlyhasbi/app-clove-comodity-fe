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
import { useCallback, useRef, useState } from 'react';
import { TDelete, TUpdate } from '../../element/offer/types';

type TAction = {
  update?: TUpdate;
  delete?: TDelete;
};

const Penawaran = () => {
  const [action, setAction] = useState<TAction | null>(null);
  const handleUpdate = useCallback(
    (data: TUpdate) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: TDelete) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const handleSave = (payload: any) => {
    const defaultPayload = {
      jenis_penawaran: payload.jenis_penawaran,
      jenis_komoditas: payload.komoditas,
      max: payload.berat_max.replace('.', ''),
      min: payload.berat_min.replace('.', ''),
      satuan: payload.satuan,
      harga_rp: payload.harga.replace('.', ''),
      catatan: '-',
    };

    console.log(defaultPayload);
  };

  const handleReset = useCallback(() => setAction(null), []);

  const cancelRef = useRef(null);

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
          onSave={handleSave}
          onReset={handleReset}
          initialValues={action?.update}
        />
        <Box marginTop={6}>
          <TabelPenawaran
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
              {`Delete ${(action?.delete as TDelete)?.id}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin akan menghapus data penawaran ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleReset}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  console.log((action?.delete as TDelete)?.id);
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

export default Penawaran;
