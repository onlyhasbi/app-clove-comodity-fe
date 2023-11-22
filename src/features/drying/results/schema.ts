import { z } from 'zod';

export const schemaHasilPengeringan = z.object({
  tim: z.string().nonempty({ message: 'Tim tidak boleh kosong' }),
  berat: z.number().min(1, { message: 'Berat tidak boleh kosong' }),
  volume: z.number().min(1, { message: 'Volume tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
  upah: z.number().min(1, { message: 'Upah tidak boleh kosong' }),
});

export type TAddPengeringan = z.infer<typeof schemaHasilPengeringan>;
export type TUpdatePengeringan = TAddPengeringan & { id: string };
export type TDeletePengeringan = { id: string };

export const defaultValues = {
  tim: '',
  berat: 0,
  volume: 0,
  tanggal: new Date(),
  catatan: '',
  upah: 0,
};
