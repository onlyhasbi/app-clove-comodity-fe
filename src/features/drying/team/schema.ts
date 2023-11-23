import { z } from 'zod';

export const teamSchema = z.object({
  nama_tim: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  ketua_tim: z.string().nonempty({ message: 'Ketua tidak boleh kosong' }),
});

export type TAddTim = z.infer<typeof teamSchema>;
export type TUpdateTim = TAddTim & { id: string };
export type TDeleteTim = { id: string };

export const defaultValues = {
  nama_tim: '',
  ketua_tim: '',
};
