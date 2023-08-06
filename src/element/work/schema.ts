import { z } from 'zod';

export const schemaPekerjaan = z.object({
  nama_pekerjaan: z
    .string()
    .nonempty({ message: 'Nama pekerjaan tidak boleh kosong' }),
  upah: z.number().min(1,{ message: 'Upah tidak boleh kosong' }),
  satuan: z.string().nonempty({ message: 'Satuan tidak boleh kosong' }),
  catatan: z.string().nonempty({ message: 'Catatan tidak boleh kosong' }),
});

export type TAddPekerjaan = z.infer<typeof schemaPekerjaan>;
export type TUpdatePekerjaan = TAddPekerjaan & { id: string };
export type TDeletePekerjaan = { id: string };

export const defaultValues = {
  nama_pekerjaan: '',
  upah: 0,
  satuan: '',
  catatan: '',
};
