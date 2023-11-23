export type PayloadPenjualan = {
  id_pembeli: string;
  jenis_komditas_cengkeh: string;
  berat_kg: number;
  harga_rp: number;
  waktu: Date;
  catatan: string;
};

export type PayloadUpdatePenjualan = PayloadPenjualan & {
  id: string;
};


export type Sell = {
    id: string;
    id_pembeli: string;
    jenis_komditas_cengkeh: string;
    berat_kg: number;
    harga_rp: number;
    waktu: string;
    catatan: string;
    verifikasi_non_author: boolean;
}

export type ResponseSell = {
  penjualan:Sell[]
}