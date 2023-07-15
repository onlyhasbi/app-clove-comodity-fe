import { z } from 'zod';

export const schemaSetoran = z.object({
  lahan: z.string().nonempty({ message: 'Lahan tidak boleh kosong' }),
  volume: z.string().nonempty({ message: 'Volumen tidak boleh kosong' }),
  upah: z.string().nonempty({ message: 'Upah tidak boleh kosong' }),
  id_buruh: z
    .string()
    .nonempty({ message: 'ID Buruh lahan tidak boleh kosong' }),
  tanggal: z.string().nonempty({ message: 'Tanggal lahan tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaSetoran = z.infer<typeof schemaSetoran>;

export const defaultValues = {
  lahan: '',
  volume: '',
  upah: '',
  id_buruh: '',
  tanggal: '',
  catatan: '',
};
