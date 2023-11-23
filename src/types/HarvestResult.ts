export type PayloadHasil = {
  id_lahan: string;
  berat_pengukuran_kg: number;
  volume_pengukuran_liter: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdateLahan = PayloadHasil & {
  id: string;
};

export type HarvestResult = {
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

export type ResponseHarvestResult = {
  hasil_panen: HarvestResult[];
};
