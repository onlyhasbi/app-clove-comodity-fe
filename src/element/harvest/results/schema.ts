import { z } from 'zod';

export const schemaHasil = z.object({
  lahan: z.string().nonempty({ message: 'Lahan tidak boleh kosong' }),
  berat: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  tanggal: z.string().nonempty({ message: 'Tanggal tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaHasil = z.infer<typeof schemaHasil>;

export const defaultValues = {
  lahan: '',
  berat: '',
  tanggal: '',
  catatan: '',
};
