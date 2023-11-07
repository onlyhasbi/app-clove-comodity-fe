export const tableAdapter = (payloads: GetInfoPenawaran[]) => {
  return payloads?.map((payload: GetInfoPenawaran) => {
    const {
      id_penawaran,
      jenis_penawaran,
      jenis_komoditas,
      max,
      min,
      harga_rp,
      nama_penawar,
      kontak_penawar,
    } = payload;
    return {
      id: id_penawaran,
      nama: nama_penawar,
      penawaran: jenis_penawaran,
      komoditas: jenis_komoditas,
      min: min,
      max: max,
      harga: harga_rp,
      kontak:
        kontak_penawar
          ?.find((item) => item.includes('whatsapp'))
          ?.split(':')[1]
          ?.trim() || '-',
    };
  });
};
