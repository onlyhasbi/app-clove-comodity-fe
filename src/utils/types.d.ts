// Profile

type PayloadProps = {
  nama: string;
  jenis_pengguna: string;
  kabupaten: string;
  provinsi: string;
  telepon: string;
};

type initialProfileProps = {
  nama: string;
  jenis_pengguna: string;
  alamat: string;
  nomor_telpon: string;
};

type PayloadRegisterProfile = {
  nomor_telpon: string;
  jenis_pengguna: string;
  nama: string;
  sandi: string;
  alamat: string;
};

type PayloadUpdateProfile = PayloadProfile & {
  id: string;
};

// sosmed
type initialSosmedProps = {
  id: string;
  jenis_kontak: string;
  kontak: string;
};

type PayloadAddSosmed = {
  jenis_kontak: string;
  kontak: string;
};

type PayloadUpdateSosmed = {
  id: string;
  jenis_kontak: string;
  kontak: string;
};

// location
type LocationProps = {
  id_kategori: string;
  id_lokasi: string;
  kategori_lokasi: string;
  nama_lokasi: string;
};

// select
type OptionProps = {
  label: string;
  value: string;
};

//table lahan
type GetLahan = {
  id: string;
  nama: string;
  lokasi: string;
  luas_m2: number;
  status_hak_panen: string;
  data_hasil_panen: string;
  daftar_hasil_panen: string[];
  total_massa_kg_hasil_panen_lahan: number;
  total_volume_liter_hasil_panen_lahan: number;
};

type GetResult = {
  id: string;
  id_lahan: string;
  lahan: string;
  berat_pengukuran_kg: number;
  volume_pengukuran_liter: number;
  waktu: string;
  catatan: string;
  daftar_setoran: string[];
  total_volume_setoran_liter: number;
  total_berat_setoran_kg: number;
};

type GetDeposit = {
  id: string;
  id_hasil_panen: string;
  id_buruh: string;
  lahan: string;
  volume_liter: number;
  berat_kg: number;
  upah_rp: number;
  waktu_setoran: string;
  waktu_hasil_panen: string;
  catatan: string;
  status_pembayaran: boolean;
  kategori_konplaint: string | null;
  deskripsi_konplaint: string | null;
};

// penawaran
type GetPenawaran = {
  id: string;
  jenis_penawaran: string;
  jenis_komoditas: string;
  max: number;
  min: number;
  satuan: string;
  harga_rp: number;
  catatan: string;
  status_penawaran: boolean;
};

// pekerjaan
type GetPekerjaan = {
  id: string;
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
  status_lowongan: boolean;
  status_referensi: boolean;
};

// pembelian

