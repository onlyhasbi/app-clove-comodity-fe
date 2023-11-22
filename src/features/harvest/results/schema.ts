import { z } from 'zod';

export const schemaHasil = z.object({
  lahan: z.string().nonempty({ message: 'Lahan tidak boleh kosong' }),
  berat: z.number().min(1, { message: 'Berat tidak boleh kosong' }),
  volume: z.number().min(1, { message: 'Volume tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TAddPanen = z.infer<typeof schemaHasil>;
export type TUpdatePanen = { id: string } & TAddPanen;
export type TDeletePanen = { id: string; nama: string };

export const defaultValues = {
  lahan: '',
  berat: 0,
  volume: 0,
  tanggal: new Date(),
  catatan: '',
};