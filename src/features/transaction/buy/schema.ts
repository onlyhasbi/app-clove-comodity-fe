import { z } from 'zod';

export const schemaPembelian = z.object({
  id_penjual: z.string().nonempty({ message: 'Id penjual tidak boleh kosong' }),
  jenis_komoditas: z
    .string()
    .nonempty({ message: 'Jenis komoditas tidak boleh kosong' }),
  berat_kg: z.number().min(1,{ message: 'Berat tidak boleh kosong' }),
  harga_rp: z.number().min(1,{ message: 'Harga tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TAddPembelian = z.infer<typeof schemaPembelian>;
export type TUpdatePembelian = TAddPembelian & { id: string };
export type TDeletePembelian = { id: string };

export const defaultValues = {
  id_penjual: '',
  jenis_komoditas: '',
  berat_kg: 0,
  harga_rp: 0,
  tanggal: new Date(),
  catatan: '',
};
