import { depositSchema } from '../features/harvest/deposit/schema';
import { z } from 'zod';

export type PayloadDeposit = {
  id_hasil_panen: string;
  id_buruh: string;
  volume_liter: number;
  berat_kg: number;
  upah_rp: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdateDeposit = PayloadDeposit & {
  id: string;
};

export type GetDeposit = {
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

export type ResponseDeposit = {
  setoran: GetDeposit[];
};

export type AddDeposit = z.infer<typeof depositSchema>;
export type UpdateDeposit = AddDeposit & {
  id: string;
  komplaint: string;
  status_bayar: boolean;
};
export type DeleteDeposit = { id: string; nama: string };

type DepositActionTable = {
  update: UpdateDeposit;
  delete: DeleteDeposit;
};

export type DepositTable = Omit<GetDeposit, 'status_pembayaran'> & {
  status_pembayaran: {
    status_pembayaran: boolean;
    id_setoran: string;
  };
} & { action: DepositActionTable };
