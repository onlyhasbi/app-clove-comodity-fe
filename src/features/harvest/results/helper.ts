import { HarvestResult } from '../../../types/HarvestResult';
import { GetLahan } from '../../../types/Land';
import dayjs from 'dayjs';

export const tableAdapter = (payloads: HarvestResult[]) => {
  return payloads?.map((payload: HarvestResult) => {
    const {
      berat_pengukuran_kg,
      catatan,
      id,
      id_lahan,
      lahan,
      volume_pengukuran_liter,
      waktu,
    } = payload;

    return {
      id,
      lahan,
      berat: berat_pengukuran_kg,
      volume: volume_pengukuran_liter,
      tanggal: dayjs(waktu).format('DD MMMM YYYY'),
      catatan: catatan,
      action: {
        update: {
          id,
          lahan: id_lahan,
          berat: +berat_pengukuran_kg,
          volume: +volume_pengukuran_liter,
          tanggal: waktu,
          catatan: catatan,
        },
        delete: {
          id,
          nama: lahan,
        },
      },
    };
  });
};

export const selectLahanAdapter = (data: GetLahan[]) => {
  return data?.map((item: GetLahan) => ({ label: item.nama, value: item.id }));
};
