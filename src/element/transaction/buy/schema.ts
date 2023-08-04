import { z } from 'zod';

export const schemaPembelian = z.object({
  id_penjual: z.string().nonempty({ message: 'Id penjual tidak boleh kosong' }),
  jenis_komoditas: z
    .string()
    .nonempty({ message: 'Jenis komoditas tidak boleh kosong' }),
  berat_kg: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  harga_rp: z.string().nonempty({ message: 'Harga tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaPembelian = z.infer<typeof schemaPembelian>;
export type TSchemaUpdatePembelian = TSchemaPembelian & { id: string };
export type TSchemaDeletePembelian = { id: string };

export const defaultValues = {
  id_penjual: '',
  jenis_komoditas: '',
  berat_kg: '0',
  harga_rp: '0',
  tanggal: new Date(),
  catatan: '',
};
