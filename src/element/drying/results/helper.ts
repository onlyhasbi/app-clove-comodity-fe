import dayjs from 'dayjs';

export const tableAdapter = (payloads: any[]) => {
  console.log(payloads);
  return payloads?.map((payload: any) => {
    const {
      id,
      tim_pengeringan,
      berat_kg,
      volume_liter,
      kering_pada_hari,
      status_pembayaran,
      catatan,
      upah,
      dari_bahan,
      kategori_konplaint,
      deskripsi_konplaint,
    } = payload;
    return {
      tim: tim_pengeringan,
      berat: berat_kg,
      volume: volume_liter,
      tanggal: dayjs(kering_pada_hari).format('DD MMMM YYYY'),
      catatan,
      upah: upah,
      status: status_pembayaran,
      bahan: dari_bahan,
      kat_komplain: kategori_konplaint,
      desk_komplain: deskripsi_konplaint,
      action: {
        update: {
          id,
          tim: tim_pengeringan,
          berat: +berat_kg,
          volume: +volume_liter,
          tanggal: new Date(kering_pada_hari),
          catatan,
          upah: +upah,
        },
        delete: {
          id,
        },
      },
    };
  });
};
