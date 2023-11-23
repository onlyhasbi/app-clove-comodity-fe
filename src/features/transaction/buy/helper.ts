import { HarvestResult } from '../../../types/HarvestResult';
import { Buy } from '../../../types/Buy';
import dayjs from 'dayjs';

export const tableAdapter = (payloads: Buy[]) => {
  return payloads?.map((payload: Buy) => {
    const {
      id,
      id_penjual,
      jenis_komditas_cengkeh,
      berat_kg,
      harga_rp,
      waktu,
      catatan,
    } = payload;

    return {
      id_penjual,
      jenis_komoditas: jenis_komditas_cengkeh,
      berat_kg,
      harga_rp,
      tanggal: dayjs(waktu).format('DD MMMM YYYY'),
      catatan,
      action: {
        update: {
          id,
          id_penjual,
          jenis_komoditas: jenis_komditas_cengkeh,
          berat_kg: +berat_kg,
          harga_rp: +harga_rp,
          tanggal: dayjs(waktu).format('YYYY-MM-DD'),
          catatan,
        },
        delete: {
          id,
        },
      },
    };
  });
};

export const selectLahanAdapter = (data: HarvestResult[]) => {
  return data?.map((item: HarvestResult) => ({
    label: item.waktu,
    value: item.id,
  }));
};
