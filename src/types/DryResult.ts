import { dryResultSchema } from '../features/drying/results/schema';
import { z } from 'zod';

export type DryResultPayload = {
  id_tim: string;
  berat_kg: number;
  volume_liter: number;
  kering_pada_hari: Date;
  catatan: string;
  upah: number;
};

export type UpdateMaterialPayload = {
  id_bahan: string;
  id_hasil: string;
};

export type UpdateDryResultPayload = DryResultPayload & {
  id: string;
};

export type GetDryResult = {
  id: string;
  tim_pengeringan: string;
  berat_kg: number;
  volume_liter: number;
  kering_pada_hari: string;
  status_pembayaran: boolean;
  catatan: string;
  upah: number;
  dari_bahan: string;
  kategori_konplaint: string;
  deskripsi_konplaint: string;
};

export type ResponseDryResult = {
  hasil: GetDryResult[];
};

export type UpdateStatusPayment = { id: string; status: boolean };

export type AddDryResult = z.infer<typeof dryResultSchema>;
export type UpdateDryResult = AddDryResult & { id: string };
export type DeleteDryResult = { id: string };

type DryResultActionTable = {
  update: UpdateDryResult;
  delete: DeleteDryResult;
};

interface Status {
  status_pembayaran: boolean;
  id_hasil_pengeringan: string;
}

interface Material {
  id: string;
  nama: string;
}

type DryResultTableBody = {
  tim: string;
  berat: number;
  volume: number;
  tanggal: string;
  catatan: string;
  upah: number;
  status: Status;
  bahan: Material;
  kat_komplain: string;
  desk_komplain: string;
};

export type DryResultTable = DryResultTableBody & {
  action: DryResultActionTable;
};
