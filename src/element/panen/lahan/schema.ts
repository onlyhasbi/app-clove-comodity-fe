import { z } from 'zod';

export const schemaLahan = z.object({
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  provinsi: z.string().nonempty({ message: 'Provinsi tidak boleh kosong' }),
  kabupaten: z.string().nonempty({ message: 'Kabupaten tidak boleh kosong' }),
  status_lahan: z
    .string()
    .nonempty({ message: 'Status lahan tidak boleh kosong' }),
  luas_lahan: z.string().nonempty({ message: 'Luas lahan tidak boleh kosong' }),
  alamat: z.string().nonempty({ message: 'Alamat tidak boleh kosong' }),
});

export type TSchemaLahan = z.infer<typeof schemaLahan>;

export const defaultValues = {
  nama: '',
  provinsi: '',
  kabupaten: '',
  status_lahan: '',
  luas_lahan: '',
  alamat: '',
};
