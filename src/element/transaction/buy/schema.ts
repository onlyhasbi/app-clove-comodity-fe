import { z } from 'zod';

export const schemaPembelian = z.object({
  id_pembeli: z.string().nonempty({ message: 'Id penjual tidak boleh kosong' }),
  jenis_komoditas: z
    .string()
    .nonempty({ message: 'Jenis komoditas tidak boleh kosong' }),
  berat_kg: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  harga_rp: z.string().nonempty({ message: 'Harga tidak boleh kosong' }),
  tanggal: z.string().nonempty({ message: 'Tanggal tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaPembelian = z.infer<typeof schemaPembelian>;

export const defaultValues = {
  id_penjual: '',
  jenis_komoditas: '',
  berat_kg: '',
  harga_rp: '',
  tanggal: '',
  catatan: '',
};
