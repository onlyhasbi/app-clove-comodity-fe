import { z } from 'zod';

export const schemaTim = z.object({
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  ketua: z.string().nonempty({ message: 'Ketua tidak boleh kosong' }),
  anggota: z.string().nonempty({ message: 'Anggota tim tidak boleh kosong' }),
});

export type TSchemaTim = z.infer<typeof schemaTim>;

export const defaultValues = {
  nama: '',
  ketua: '',
  anggota: '',
};
