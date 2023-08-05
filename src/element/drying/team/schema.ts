import { z } from 'zod';

export const schemaTim = z.object({
  nama_tim: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  ketua_tim: z.string().nonempty({ message: 'Ketua tidak boleh kosong' }),
});

export type TSchemaTim = z.infer<typeof schemaTim>;
export type TSchemaUpdateTim = TSchemaTim & { id: string };
export type TSchemaDeleteTim = { id: string };

export const defaultValues = {
  nama_tim: '',
  ketua_tim: '',
};
