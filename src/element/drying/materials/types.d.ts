import { TAddBahan, TUpdateBahan, TDeleteBahan } from './schema';

type TActionTable = {
  update: TUpdateBahan;
  delete: TDeleteBahan;
};

export type TTableBahan = {
  berat_kg: string;
  volume_liter: string;
  waktu_mulai: string;
  catatan: string;
} & {
  action: TActionTable;
};
