import { materialSchema } from '../features/drying/materials/schema';
import { z } from 'zod';

export type PayloadMaterial = {
  berat_kg: number;
  volume_liter: number;
  dikeringkan_pada_hari: string;
  catatan: string;
};

export type PayloadUpdateMaterial = PayloadMaterial & {
  id: string;
};

export type Material = {
  id: string;
  berat_kg: string;
  volume_liter: string;
  dikeringkan_pada_hari: string;
  catatan: string;
};

export type ResponseMaterial = {
  bahan: Material[];
};

export type AddMaterial = z.infer<typeof materialSchema>;
export type UpdateMaterial = AddMaterial & { id: string };
export type DeleteMaterial = { id: string };

type MaterialActionTable = {
  update: UpdateMaterial;
  delete: DeleteMaterial;
};

export type MaterialTable = {
  id: string;
  berat_kg: string;
  volume_liter: string;
  waktu_mulai: string;
  catatan: string;
} & {
  action: MaterialActionTable;
};
