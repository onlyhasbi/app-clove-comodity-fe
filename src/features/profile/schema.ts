import { z } from 'zod';

export const profileSchema = z.object({
  jenis_pengguna: z
    .string()
    .nonempty({ message: 'Jenis pengguna tidak boleh kosong' }),
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  provinsi: z.string().nonempty({ message: 'Provinsi tidak boleh kosong' }),
  kabupaten: z.string().nonempty({ message: 'Kabupaten tidak boleh kosong' }),
  telepon: z.string().nonempty({ message: 'No telepon tidak boleh kosong' }),
});

export type TAddProfile = z.infer<typeof profileSchema>;
export type TUpdateProfile = TAddProfile & { id: string };

export const defaultValues = {
  jenis_pengguna: '',
  nama: '',
  provinsi: '',
  kabupaten: '',
  telepon: '',
};
