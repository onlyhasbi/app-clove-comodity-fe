import { z } from 'zod';

export const schemaRegister = z.object({
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  jenis_pengguna: z
    .string()
    .nonempty({ message: 'Jenis pengguna tidak boleh kosong' }),
  provinsi: z.string().nonempty({ message: 'Provinsi tidak boleh kosong' }),
  kabupaten: z.string().nonempty({ message: 'Kabupaten tidak boleh kosong' }),
  telepon: z.string().nonempty({ message: 'No telepon tidak boleh kosong' }),
  sandi: z.string().nonempty({ message: 'Sandi tidak boleh kosong' }),
});

export type TSchemaRegister = z.infer<typeof schemaRegister>;

export const defaultValues = {
  nama: '',
  jenis_pengguna: '',
  provinsi: '',
  kabupaten: '',
  telepon: '',
  sandi: '',
};
