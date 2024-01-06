import { GetLand } from '../../../types/Land';
import { getProvince } from '../../../utils/getProvince';

export const tableAdapter = (payloads: GetLand[]) => {
  return payloads?.map((payload: GetLand) => {
    const {
      id,
      nama,
      lokasi,
      luas_m2,
      status_hak_panen,
      total_massa_kg_hasil_panen_lahan,
    } = payload;

    const provinsi = getProvince(lokasi);

    return {
      id,
      nama,
      provinsi: provinsi,
      kabupaten: lokasi,
      status_lahan: status_hak_panen,
      luas_lahan: luas_m2,
      hasil_panen: total_massa_kg_hasil_panen_lahan,
      action: {
        update: {
          id,
          nama,
          provinsi: provinsi,
          kabupaten: lokasi,
          status_lahan: status_hak_panen,
          luas_lahan: +luas_m2,
          hasil_panen: total_massa_kg_hasil_panen_lahan,
        },

        delete: {
          id,
          nama,
          hasil_panen: total_massa_kg_hasil_panen_lahan,
        },
      },
    };
  });
};
