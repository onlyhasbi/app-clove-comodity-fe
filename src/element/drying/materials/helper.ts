import dayjs from 'dayjs';

export const tableAdapter = (payloads: GetBahan[]) => {
  return payloads?.map((payload: GetBahan) => {
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
