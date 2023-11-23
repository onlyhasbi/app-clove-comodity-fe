export type PayloadPembelian = {
  id_penjual: string;
  jenis_komditas_cengkeh: string;
  berat_kg: number;
  harga_rp: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdatePembelian = PayloadPembelian & {
  id: string;
};

export type Buy = {
  id: string;
  id_penjual: string;
  jenis_komditas_cengkeh: string;
  berat_kg: number;
  harga_rp: number;
  waktu: string;
  catatan: string;
  verifikasi_non_author: boolean;
};

export type ResponseBuy = {
  pembelian: Buy[];
};
