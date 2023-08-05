import { z } from 'zod';

export const schemaBahan = z.object({
  berat_kg: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume_liter: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  waktu_mulai: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaBahan = z.infer<typeof schemaBahan>;
export type TSchemaUpdateBahan = TSchemaBahan & { id: string };
export type TSchemaDeleteBahan = { id: string };

export const defaultValues = {
  berat_kg: '0',
  volume_liter: '0',
  waktu_mulai: new Date(),
  catatan: '',
};
