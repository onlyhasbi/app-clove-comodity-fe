export const tableAdapter = (payloads: GetPekerjaan[]) => {
  return payloads?.map((payload: GetPekerjaan) => {
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
      status: status_lowongan,
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
