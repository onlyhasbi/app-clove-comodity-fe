import { z } from 'zod';

export const schemaPenawaran = z.object({
  jenis_penawaran: z
    .string()
    .nonempty({ message: 'Jenis penawaran tidak boleh kosong' }),
  komoditas: z.string().nonempty({ message: 'Komoditas tidak boleh kosong' }),
  satuan: z.string().nonempty({ message: 'Satuan tidak boleh kosong' }),
  harga: z.string().nonempty({ message: 'Harga tidak boleh kosong' }),
  berat_min: z
    .string()
    .nonempty({ message: 'Berat minimal tidak boleh kosong' }),
  berat_max: z
    .string()
    .nonempty({ message: 'Berat maksimal tidak boleh kosong' }),
});

export type TSchemaPenawaran = z.infer<typeof schemaPenawaran>;
export type TSchemaUpdatePenawaran = TSchemaPenawaran & { id: string };

export const defaultValues = {
  jenis_penawaran: '',
  komoditas: '',
  satuan: '',
  harga: '0',
  berat_min: '0',
  berat_max: '0',
};
