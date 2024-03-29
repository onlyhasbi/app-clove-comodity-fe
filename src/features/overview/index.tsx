import { Stack, Spinner } from '@chakra-ui/react';
import CardSummary from './card';
import Chart from './chart';
import TableInfo from './table';
import {
  useGetPengeringan,
  useGetLahan,
  useGetKomoditas,
  useGetTransaksi,
} from '../../hooks/useOverview.hook';
import dayjs from 'dayjs';

function Overview() {
  const getTransaksi = useGetTransaksi();
  const getPengeringan = useGetPengeringan();
  const getKomoditas = useGetKomoditas();
  const getLahan = useGetLahan();

  const jumlahPengeringan = getPengeringan.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getPengeringan?.data?.data?.jumlah_data
  );
  const jumlahKomoditas = getKomoditas.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getKomoditas?.data?.data?.jumlah_data
  );
  const jumlahTransaksi = getTransaksi.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getTransaksi?.data?.data?.jumlah_data
  );
  const jumlahLahan = getLahan.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getLahan?.data?.data?.jumlah_data
  );

  const dataUpah = getKomoditas.isSuccess
    ? getKomoditas?.data?.data?.data?.map((item: any) => ({
        upah: item.harga_rp,
        tanggal: dayjs(item.waktu).format('DD/MM/YYYY'),
      }))
    : [];

  const dataCengkeh = getKomoditas.isSuccess
    ? getKomoditas?.data?.data?.data?.map((item: any) => ({
        cengkeh_basah: item.cengkeh_basah,
        cengkeh_kering: item.cengkeh_kering,
        tanggal: dayjs(item.waktu).format('DD/MM/YYYY'),
      }))
    : [];

  const cardProps = {
    jumlahPengeringan,
    jumlahKomoditas,
    jumlahTransaksi,
    jumlahLahan,
  };

  return (
    <Stack gap={10}>
      <Chart dataUpah={dataUpah} dataCengkeh={dataCengkeh} />
      <CardSummary cardProps={cardProps} />
      <TableInfo />
    </Stack>
  );
}

export default Overview;
