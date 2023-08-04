import { z } from 'zod';

export const schemaPekerjaan = z.object({
  nama_pekerjaan: z
    .string()
    .nonempty({ message: 'Nama pekerjaan tidak boleh kosong' }),
  upah: z.string().nonempty({ message: 'Upah tidak boleh kosong' }),
  satuan: z.string().nonempty({ message: 'Satuan tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TSchemaPekerjaan = z.infer<typeof schemaPekerjaan>;
export type TSchemaUpdatePekerjaan = TSchemaPekerjaan & { id: string };
export type TSchemaDeletePekerjaan = { id: string };

export const defaultValues = {
  nama_pekerjaan: '',
  upah: '0',
  satuan: '',
  catatan: '',
};
