const BASE_URL = 'https://api-clove.vercel.app';

export const url = {
  auth: {
    key: 'auth',
    dev: `${BASE_URL}/authentication-acc`,
  },
  profile: {
    key: 'profile',
    dev: `${BASE_URL}/user-acc`,
  },
  penawaran: {
    key: 'penawaran',
    dev: `${BASE_URL}/penawaran-komoditas`,
  },
  pembelian: {
    key: 'pembelian',
    dev: `${BASE_URL}/pembelian`,
  },
  penjualan: {
    key: 'penjualan',
    dev: `${BASE_URL}/penjualan`,
  },
  tim: {
    key: 'tim-pengeringan',
    dev: `${BASE_URL}/tim-pengeringan`,
  },
  bahan: {
    key: 'bahan-pengeringan',
    dev: `${BASE_URL}/bahan-pengeringan`,
  },
  update_bahan: {
    key: 'update-bahan-pengeringan',
    dev: `${BASE_URL}/set-pengeringan`,
  },
  pengeringan: {
    key: 'hasil-pengeringan',
    dev: `${BASE_URL}/hasil-pengeringan`,
  },
  pembayaran_pengeringan: {
    key: 'update-pengeringan',
    dev: `${BASE_URL}/status-pembayaran-hasil-pengeringan`,
  },
  pekerjaan: {
    key: 'pekerjaan',
    dev: `${BASE_URL}/lowongan-kerja`,
  },
  sosmed: {
    key: 'sosmed',
    dev: `${BASE_URL}/acc-kontak`,
  },
  provinsi: {
    key: 'provinsi',
    dev: `${BASE_URL}/lokasi/all-provinsi`,
  },
  kabupaten: {
    key: 'kabupaten',
    dev: `${BASE_URL}/lokasi/all-kabupaten-kota`,
  },
  lahan: {
    key: 'lahan',
    dev: `${BASE_URL}/lahan`,
  },
  hasil_panen: {
    key: 'hasil-panen',
    dev: `${BASE_URL}/hasil-panen`,
  },
  setoran: {
    key: 'setoran',
    dev: `${BASE_URL}/setoran`,
  },
  pembayaran_setoran: {
    key: 'pembayaran_setoran',
    dev: `${BASE_URL}/status-pembayaran-setoran`,
  },
  report_pengeringan: {
    key: 'report_pengeringan',
    dev: `${BASE_URL}/index-pengeringan`,
  },
  report_transaksi: {
    key: 'report_transaksi',
    dev: `${BASE_URL}/jual-beli`,
  },
  report_komoditas: {
    key: 'report_komoditas',
    dev: `${BASE_URL}/komoditas-keluar-masuk`,
  },
  report_lahan: {
    key: 'report_lahan',
    dev: `${BASE_URL}/produktifitas-lahan`,
  },
  info_penawaran: {
    key: 'info_penawaran',
    dev: `${BASE_URL}/info-penawaran-acc`,
  },
  info_buruh: {
    key: 'info_lamaran_kerja',
    dev: `${BASE_URL}/info-lamaran-kerja-buruh`,
  },
  update_status_penawaran: {
    key: 'update_status_penawaran',
    dev: `${BASE_URL}/status-penawaran-komoditas`,
  },
  update_status_lowongan: {
    key: 'update_status_lowongan',
    dev: `${BASE_URL}/status-lowongan-kerja`,
  },
};
