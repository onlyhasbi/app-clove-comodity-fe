// Profile

type PayloadProps = {
  nama: string;
  jenis_pengguna: string;
  kabupaten: string;
  provinsi: string;
  telepon: string;
};

// select
type OptionProps = {
  label: string;
  value: string;
};

//Update bahan
type TUpdateMaterial = { id_bahan: string; id_hasil: string };

// info penawaran
type GetInfoPenawaran = {
  id_penawaran: string;
  jenis_penawaran: string;
  jenis_komoditas: string;
  max: number;
  min: number;
  satuan: string;
  harga_rp: number;
  catatan: string;
  id_penawar: string;
  jenis_pengguna_penawar: string;
  nama_penawar: string;
  kontak_penawar: string[];
  alamat_penawar: string;
};

//info buruh
type GetInfoBuruh = {
  id_lamaran: string;
  jenis_pekerjaan: string;
  upah_harapan_rp: number;
  indikator_ukur: string;
  catatan: string;
  id_pelamar: string;
  nama_pelamar: string;
  kontak_pelamar: string[];
  alamat_pelamar: string;
};

type UpdateStatus = {
  id: string;
  value: boolean;
};

type ErrorResponse = {
  statusCode: number;
  message: string;
};
