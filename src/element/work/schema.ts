import { z } from 'zod';

export const schemaPekerjaan = z.object({
  nama_pekerjaan: z
    .string()
    .nonempty({ message: 'Nama pekerjaan tidak boleh kosong' }),
  upah: z.string().nonempty({ message: 'Upah tidak boleh kosong' }),
  satuan: z.string().nonempty({ message: 'Satuan tidak boleh kosong' }),
  lokasi: z.string().nonempty({ message: 'Lokasi tidak boleh kosong' }),
});

export type TSchemaPekerjaan = z.infer<typeof schemaPekerjaan>;

export const defaultValues = {
  nama_pekerjaan: '',
  upah: '',
  satuan: '',
  lokasi: '',
};
