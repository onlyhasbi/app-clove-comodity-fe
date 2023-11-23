export type PayloadSetoran = {
  id_hasil_panen: string;
  id_buruh: string;
  volume_liter: number;
  berat_kg: number;
  upah_rp: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdateSetoran = PayloadSetoran & {
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
