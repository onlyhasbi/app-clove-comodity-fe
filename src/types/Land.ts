import { landSchema } from '../features/harvest/land/schema';
import { z } from 'zod';

export type PayloadLand = {
  nama: string;
  lokasi: string;
  luas_m2: number;
  status_hak_panen: string;
};

export type PayloadUpdateLand = PayloadLand & {
  id: string;
};

export type GetLand = {
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

export type ResponseLand = {
  lahan: GetLand[];
};

export type AddLand = z.infer<typeof landSchema>;

export type UpdateLand = AddLand & {
  id: string;
  hasil_panen: string;
};

export type DeleteLand = {
  id: string;
  nama: string;
  hasil_panen: string;
};

type LandActionTable = {
  update: UpdateLand;
  delete: DeleteLand;
};

export type LandTable = AddLand & {
  hasil_panen: string;
  action: LandActionTable;
};
