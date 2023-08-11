import { Stack } from '@chakra-ui/react';
import TabelBuruh from './labor';
import TabelPenawaran from './offer';
import {
  useGetInfoBuruh,
  useGetInfoPenawaran,
} from '../../../hooks/useOverview.hook';

function TableInfo() {
  const getInfoBuruh = useGetInfoBuruh();
  const infoBuruh = getInfoBuruh.isSuccess
    ? getInfoBuruh?.data?.data?.data?.lamaran
    : [];

  const getInfoPenawaran = useGetInfoPenawaran();
  const infoPenawaran = getInfoPenawaran.isSuccess
    ? getInfoPenawaran?.data?.data?.data?.penawaran
    : [];

  return (
    <Stack direction="column" gap={10} w="full">
      <TabelBuruh isLoading={getInfoBuruh.isLoading} data={infoBuruh} />
      <TabelPenawaran
        isLoading={getInfoPenawaran.isLoading}
        data={infoPenawaran}
      />
    </Stack>
  );
}

export default TableInfo;
