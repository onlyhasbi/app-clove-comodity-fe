import { HarvestResult } from '../../../types/HarvestResult';
import { Sell } from '../../../types/Sell';
import dayjs from 'dayjs';

export const tableAdapter = (payloads: Sell[]) => {
  return payloads.map((payload: Sell) => {
    const {
      id,
      id_pembeli,
      jenis_komditas_cengkeh,
      berat_kg,
      harga_rp,
      waktu,
      catatan,
    } = payload;

    return {
      id_pembeli,
      jenis_komoditas: jenis_komditas_cengkeh,
      berat_kg,
      harga_rp,
      tanggal: dayjs(waktu).format('DD MMMM YYYY'),
      catatan,
      action: {
        update: {
          id,
          id_pembeli,
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
