import { z } from 'zod';

export const schemaProfile = z.object({
  jenis_pengguna: z.string(),
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  alamat: z.string().nonempty({ message: 'Alamat tidak boleh kosong' }),
  provinsi: z.string().nonempty({ message: 'Provinsi tidak boleh kosong' }),
  kabupaten: z.string().nonempty({ message: 'Kabupaten tidak boleh kosong' }),
  phone: z.string().nonempty({ message: 'No telepon tidak boleh kosong' }),
});

export type TSchemaProfile = z.infer<typeof schemaProfile>;

export const defaultValues = {
  jenis_pengguna: '',
  nama: '',
  alamat: '',
  provinsi: '',
  kabupaten: '',
  phone: '',
};
