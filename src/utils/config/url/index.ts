const BASE_URL = 'https://api-clove.vercel.app';

export const url = {
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
