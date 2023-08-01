import { z } from 'zod';

export const schemaHasil = z.object({
  lahan: z.string().nonempty({ message: 'Lahan tidak boleh kosong' }),
  berat: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaHasil = z.infer<typeof schemaHasil>;
export type TSchemaUpdateHasil = { id: string } & TSchemaHasil;
export type TSchemaDeleteHasil = { id: string; nama: string };

export const defaultValues = {
  lahan: '',
  berat: '0',
  volume: '0',
  tanggal: new Date(),
  catatan: '',
};
