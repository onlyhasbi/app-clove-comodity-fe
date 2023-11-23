import { z } from 'zod';

export const materialSchema = z.object({
  berat_kg: z.number().min(1, { message: 'Berat tidak boleh kosong' }),
  volume_liter: z.number().min(1, { message: 'Volume tidak boleh kosong' }),
  waktu_mulai: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TAddBahan = z.infer<typeof materialSchema>;
export type TUpdateBahan = TAddBahan & { id: string };
export type TDeleteBahan = { id: string };

export const defaultValues = {
  berat_kg: 0,
  volume_liter: 0,
  waktu_mulai: new Date(),
  catatan: '',
};
