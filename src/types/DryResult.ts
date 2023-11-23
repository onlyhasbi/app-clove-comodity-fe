export type PayloadPengeringan = {
  id_tim: string;
  berat_kg: number;
  volume_liter: number;
  kering_pada_hari: Date;
  catatan: string;
  upah: number;
};

export type PayloadUpdateBahan = {
  id_bahan: string;
  id_hasil: string;
};

export type PayloadUpdatePengeringan = PayloadPengeringan & {
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

type ResponseDryResult = {
  hasil: GetDryResult[];
};

export type TUpdateStatusPayment = { id: string; status: boolean };

export default ResponseDryResult;
