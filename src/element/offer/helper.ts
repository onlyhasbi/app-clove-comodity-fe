export const tableAdapter = (payloads: GetPenawaran[]) => {
  return payloads.map((payload: GetPenawaran) => {
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
      status: status_penawaran,
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
