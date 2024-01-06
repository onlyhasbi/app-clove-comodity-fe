import { z } from 'zod';
import { harvestResultSchema } from '../features/harvest/results/schema';

export type PayloadResult = {
  id_lahan: string;
  berat_pengukuran_kg: number;
  volume_pengukuran_liter: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdateLand = PayloadResult & {
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

export type AddHarvestResult = z.infer<typeof harvestResultSchema>;
export type UpdateHarvestResult = { id: string } & AddHarvestResult;
export type DeleteHarvestResult = { id: string; nama: string };

type HarvestResultActionTable = {
  update: UpdateHarvestResult;
  delete: DeleteHarvestResult;
};

export type HarvestResultTable = HarvestResult & {
  action: HarvestResultActionTable;
};
