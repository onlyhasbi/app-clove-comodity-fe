import { Material } from '../../../types/Material';
import dayjs from 'dayjs';

export const tableAdapter = (payloads: Material[]) => {
  return payloads?.map((payload: Material) => {
    const { id, berat_kg, volume_liter, dikeringkan_pada_hari, catatan } =
      payload;
    return {
      id,
      berat_kg,
      volume_liter,
      waktu_mulai: dayjs(dikeringkan_pada_hari).format('DD MMMM YYYY'),
      catatan,
      action: {
        update: {
          id,
          berat_kg: +berat_kg,
          volume_liter: +volume_liter,
          waktu_mulai: new Date(dikeringkan_pada_hari),
          catatan,
        },
        delete: {
          id,
        },
      },
    };
  });
};
