import { z } from 'zod';

export const schemaPenawaran = z.object({
  jenis_penawaran: z
    .string()
    .nonempty({ message: 'Jenis penawaran tidak boleh kosong' }),
  komoditas: z.string().nonempty({ message: 'Komoditas tidak boleh kosong' }),
  satuan: z.string().nonempty({ message: 'Satuan tidak boleh kosong' }),
  harga: z.number().min(1, { message: 'Harga tidak boleh kosong' }),
  berat_min: z.number().min(1, { message: 'Berat minimal tidak boleh kosong' }),
  berat_max: z
    .number()
    .min(1, { message: 'Berat maksimal tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TAddPenawaran = z.infer<typeof schemaPenawaran>;
export type TUpdatePenawaran = TAddPenawaran & { id: string };
export type TDeletePenawaran = { id: string };

export const defaultValues = {
  jenis_penawaran: '',
  komoditas: '',
  satuan: '',
  harga: 0,
  berat_min: 0,
  berat_max: 0,
  catatan: '',
};
