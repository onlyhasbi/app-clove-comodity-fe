import dayjs from 'dayjs';

export const selectLahanAdapter = (data: any) => {
  return data?.map((item: any) => ({
    label: item.waktu,
    value: item.id,
  }));
};

export const tableAdapter = (payloads: any) => {
  return payloads.map((payload: any) => {
    const {
      id,
      id_buruh,
      tanggal_setoran,
      catatan,
      upah_rp,
      berat_kg,
      volume_liter,
      waktu_setoran,
      id_hasil_panen,
      deskripsi_konplaint,
      status_pembayaran,
    } = payload;

    return {
      id_buruh,
      tanggal_setoran,
      berat: berat_kg,
      volume: volume_liter,
      upah: upah_rp,
      tanggal: dayjs(waktu_setoran).format('DD MMMM YYYY'),
      komplaint: deskripsi_konplaint,
      status_bayar: status_pembayaran,
      catatan,
      action: {
        update: {
          id,
          id_buruh,
          tanggal_setoran: id_hasil_panen,
          berat: String(berat_kg),
          volume: String(volume_liter),
          upah: String(upah_rp),
          tanggal: dayjs(waktu_setoran),
          komplaint: deskripsi_konplaint,
          status_bayar: status_pembayaran,
          catatan,
        },
        delete: {
          id,
          nama: tanggal_setoran,
        },
      },
    };
  });
};
