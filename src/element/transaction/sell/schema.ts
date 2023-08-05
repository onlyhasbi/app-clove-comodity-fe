import { z } from 'zod';

export const schemaPenjualan = z.object({
  id_pembeli: z.string().nonempty({ message: 'Id penjual tidak boleh kosong' }),
  jenis_komoditas: z
    .string()
    .nonempty({ message: 'Jenis komoditas tidak boleh kosong' }),
  berat_kg: z.number().min(1, { message: 'Berat tidak boleh kosong' }),
  harga_rp: z.number().min(1, { message: 'Harga tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaPenjualan = z.infer<typeof schemaPenjualan>;
export type TSchemaUpdatePenjualan = TSchemaPenjualan & { id: string };
export type TSchemaDeletePenjualan = { id: string };

export const defaultValues = {
  id_pembeli: '',
  jenis_komoditas: '',
  berat_kg: 0,
  harga_rp: 0,
  tanggal: new Date(),
  catatan: '',
};
