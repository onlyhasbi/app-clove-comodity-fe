import dayjs from 'dayjs';

export const tableAdapter = (payloads: any[]) => {
  return payloads.map((payload: any) => {
    const {
      id,
      tim_pengeringan,
      berat_kg,
      volume_liter,
      kering_pada_hari,
      catatan,
      upah,
    } = payload;
    return {
      tim: tim_pengeringan,
      berat: berat_kg,
      volume: volume_liter,
      tanggal: dayjs(kering_pada_hari).format('DD MMMM YYYY'),
      catatan,
      upah: upah,
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
