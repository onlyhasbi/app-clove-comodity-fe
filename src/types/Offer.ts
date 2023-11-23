export type PayloadOffer = {
  jenis_penawaran: string;
  jenis_komoditas: string;
  max: number;
  min: number;
  satuan: string;
  harga_rp: number;
  catatan: string;
};

export type PayloadUpdateOffer = PayloadOffer & {
  id: string;
};

export type Offer = {
  id: string;
  jenis_penawaran: string;
  jenis_komoditas: string;
  max: number;
  min: number;
  satuan: string;
  harga_rp: number;
  catatan: string;
  status_penawaran: boolean;
};

export type ResponseOffer = {
  lamaran: Offer[];
};
