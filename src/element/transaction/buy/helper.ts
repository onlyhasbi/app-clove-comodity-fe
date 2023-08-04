import dayjs from 'dayjs';

// export type TableAdapterPembelian = {

// };

export const tableAdapter = (payloads: GetPembelian[]) => {
  return payloads.map((payload: GetPembelian) => {
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
          berat_kg,
          harga_rp,
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

export const selectLahanAdapter = (data: GetResult[]) => {
  return data?.map((item: GetResult) => ({
    label: item.waktu,
    value: item.id,
  }));
};
