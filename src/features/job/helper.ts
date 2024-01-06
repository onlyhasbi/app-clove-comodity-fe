import { Job } from "../../types/Job";

export const tableAdapter = (payloads: Job[]) => {
  return payloads?.map((payload: Job) => {
    const {
      id,
      jenis_pekerjaan,
      upah_rp,
      indikator_ukur,
      catatan,
      status_lowongan,
    } = payload;
    return {
      id,
      nama_pekerjaan: jenis_pekerjaan,
      upah: upah_rp,
      satuan: indikator_ukur,
      catatan,
      status: { id, value: status_lowongan },
      action: {
        update: {
          id,
          nama_pekerjaan: jenis_pekerjaan,
          upah: +upah_rp,
          satuan: indikator_ukur,
          catatan,
        },
        delete: { id },
      },
    };
  });
};
