import { Offer } from '../../types/Offer';

export const tableAdapter = (payloads: Offer[]) => {
  return payloads?.map((payload: Offer) => {
    const {
      id,
      jenis_penawaran,
      jenis_komoditas,
      max,
      min,
      satuan,
      harga_rp,
      catatan,
      status_penawaran,
    } = payload;
    return {
      id,
      jenis_penawaran,
      komoditas: jenis_komoditas,
      berat_min: min,
      berat_max: max,
      satuan,
      harga: harga_rp,
      catatan,
      status: { id, value: status_penawaran },
      action: {
        update: {
          id,
          jenis_penawaran,
          komoditas: jenis_komoditas,
          berat_min: +min,
          berat_max: +max,
          satuan,
          harga: +harga_rp,
          catatan,
        },
        delete: { id },
      },
    };
  });
};
