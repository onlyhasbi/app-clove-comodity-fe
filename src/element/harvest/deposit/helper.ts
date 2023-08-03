import dayjs from 'dayjs';

// export type TableAdapterSetoran = {
//   id_buruh: string;
//   tanggal_panen: string;
//   berat: number;
//   volume: number;
//   upah: number;
//   tanggal: string;
//   komplaint: string;
//   status_bayar: string;
//   catatan: string;
//   action: {
//     update: {
//       id: number;
//       id_buruh: string;
//       tanggal_panen: string;
//       berat: string;
//       volume: string;
//       upah: string;
//       tanggal: dayjs.Dayjs;
//       komplaint: string;
//       status_bayar: string;
//       catatan: string;
//     };
//     delete: {
//       id: number;
//       nama: string;
//     };
//   };
// };

export const tableAdapter = (payloads: GetDeposit[]) => {
  return payloads.map((payload: GetDeposit) => {
    const {
      id,
      id_buruh,
      waktu_hasil_panen,
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
      tanggal_panen: dayjs(waktu_hasil_panen).format('DD MMMM YYYY'),
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
          tanggal_panen: id_hasil_panen,
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
          nama: waktu_hasil_panen,
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
