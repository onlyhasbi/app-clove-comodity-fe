export type PayloadLahan = {
  nama: string;
  lokasi: string;
  luas_m2: number;
  status_hak_panen: string;
};

export type PayloadUpdateLahan = PayloadLahan & {
  id: string;
};

export type GetLahan = {
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

export type ResponseLahan = {
  lahan: GetLahan[];
};
