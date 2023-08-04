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
};
