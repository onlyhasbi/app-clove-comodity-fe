import { z } from 'zod';

export const schemaSetoran = z.object({
  lahan: z.string().nonempty({ message: 'Lahan tidak boleh kosong' }),
  id_buruh: z
    .string()
    .nonempty({ message: 'ID Buruh lahan tidak boleh kosong' }),
  berat: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  upah: z.string().nonempty({ message: 'Upah tidak boleh kosong' }),
  tanggal: z.coerce.date(),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaSetoran = z.infer<typeof schemaSetoran>;
export type TSchemaUpdateSetoran = TSchemaSetoran & {
  id: string;
  komplaint: string;
  status_bayar: boolean;
};
export type TSchemaDeleteSetoran = { id: string; nama: string };

export const defaultValues = {
  lahan: '',
  id_buruh: '',
  berat: '0',
  volume: '0',
  upah: '0',
  tanggal: new Date(),
  catatan: '',
};
