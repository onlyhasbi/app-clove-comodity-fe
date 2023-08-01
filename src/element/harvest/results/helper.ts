import dayjs from 'dayjs';

export const selectLahanAdapter = (data: any) => {
  return data?.map((item: any) => ({ label: item.nama, value: item.id }));
};

export const tableAdapter = (payloads: any) => {
  return payloads.map((payload: any) => {
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
      lahan,
      berat: berat_pengukuran_kg,
      volume: volume_pengukuran_liter,
      tanggal: dayjs(waktu).format('DD MMMM YYYY'),
      catatan: catatan,
      action: {
        update: {
          id,
          lahan: id_lahan,
          berat: String(berat_pengukuran_kg),
          volume: String(volume_pengukuran_liter),
          tanggal: waktu,
          catatan: catatan,
        },
        delete: {
          id,
          nama:lahan,
        },
      },
    };
  });
};
