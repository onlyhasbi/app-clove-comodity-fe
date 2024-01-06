import { z } from 'zod';
import { offerSchema } from '../features/offer/schema';

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

export type AddOffer = z.infer<typeof offerSchema>;
export type UpdateOffer = AddOffer & { id: string };
export type DeleteOffer = { id: string };

type OfferActionTable = {
  update: UpdateOffer;
  delete: DeleteOffer;
};

export type OfferTable = AddOffer & {
  status: { id: string; value: boolean }
} & { action: OfferActionTable };
