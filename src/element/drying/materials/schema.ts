import { z } from 'zod';

export const schemaBahanPengeringan = z.object({
  buruh: z.string().nonempty({ message: 'Buruh tidak boleh kosong' }),
  berat: z.string().nonempty({ message: 'Berat tidak boleh kosong' }),
  volume: z.string().nonempty({ message: 'Volume tidak boleh kosong' }),
  tanggal: z.date(),
});

export type TSchemaBahanPengeringan = z.infer<typeof schemaBahanPengeringan>;

export const defaultValues = {
  buruh: '',
  berat: '',
  volume: '',
  tanggal: '',
};
