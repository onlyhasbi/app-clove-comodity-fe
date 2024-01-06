import { HarvestResult } from '../../../types/HarvestResult';
import { GetLand } from '../../../types/Land';
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
      berat_pengukuran_kg,
      volume_pengukuran_liter,
      waktu: dayjs(waktu).format('DD MMMM YYYY'),
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

export const selectLahanAdapter = (data: GetLand[]) => {
  return data?.map((item: GetLand) => ({ label: item.nama, value: item.id }));
};
