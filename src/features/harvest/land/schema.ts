import { z } from 'zod';

export const landSchema = z.object({
  nama: z.string().nonempty({ message: 'Nama tidak boleh kosong' }),
  provinsi: z.string().nonempty({ message: 'Provinsi tidak boleh kosong' }),
  kabupaten: z.string().nonempty({ message: 'Kabupaten tidak boleh kosong' }),
  status_lahan: z
    .string()
    .nonempty({ message: 'Status lahan tidak boleh kosong' }),
  luas_lahan: z.number().min(1,{ message: 'Luas lahan tidak boleh kosong' }),
});

export const defaultValues = {
  nama: '',
  provinsi: '',
  kabupaten: '',
  status_lahan: '',
  luas_lahan: 0,
};
