import { z } from 'zod';

export const schemaHasilPengeringan = z.object({
  tim: z.string().nonempty({ message: 'Tim tidak boleh kosong' }),
  berat_kg: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume_liter: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  waktu_selesai: z
    .string()
    .nonempty({ message: 'Waktu selesai tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaHasilPengeringan = z.infer<typeof schemaHasilPengeringan>;

export const defaultValues = {
  tim: '',
  berat_kg: '',
  volume_liter: '',
  waktu_selesai: '',
  catatan: '',
};
