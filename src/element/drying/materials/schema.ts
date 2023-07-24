import { z } from 'zod';

export const schemaBahanPengeringan = z.object({
  berat_kg: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume_liter: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  waktu_mulai: z
    .string()
    .nonempty({ message: 'Waktu mulai tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaBahanPengeringan = z.infer<typeof schemaBahanPengeringan>;

export const defaultValues = {
  berat_kg: '',
  volume_liter: '',
  waktu_mulai: '',
  catatan: '',
};
