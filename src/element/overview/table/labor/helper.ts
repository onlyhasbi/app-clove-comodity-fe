export const tableAdapter = (payloads: GetInfoBuruh[]) => {
  return payloads?.map((payload: GetInfoBuruh) => {
    const {
      jenis_pekerjaan,
      upah_harapan_rp,
      indikator_ukur,
      nama_pelamar,
      kontak_pelamar,
    } = payload;
    return {
      nama: nama_pelamar,
      jenis: jenis_pekerjaan,
      upah: upah_harapan_rp,
      satuan: indikator_ukur,
      kontak:
        kontak_pelamar
          .find((item) => item.includes('telpon'))
          ?.split(':')[1]
          .trim() || '-',
    };
  });
};
